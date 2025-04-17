
// This service connects to Cloudinary for image storage and Supabase for metadata

import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  public_id?: string; // Cloudinary public ID
}

// Initialize with default images if the database is empty
const initializeDefaultImages = (): GalleryImage[] => {
  return [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Elegante ricevimento di nozze con lampadari",
      category: "Matrimoni"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Allestimento per conferenza aziendale con arredamento moderno",
      category: "Aziendali"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Celebrazione di compleanno con illuminazione decorativa",
      category: "Compleanni"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Cena di gala con allestimenti formali",
      category: "Gala"
    }
  ];
};

// Get all images from Supabase
export const getAllImages = async (): Promise<GalleryImage[]> => {
  try {
    // Try to fetch images from Supabase
    const { data: images, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching gallery images:', error);
      throw error;
    }

    // If there are no images in the database, initialize with defaults
    if (!images || images.length === 0) {
      const defaultImages = initializeDefaultImages();
      
      // Add each default image to the database
      for (const image of defaultImages) {
        await addImage(image);
      }
      
      // Fetch the newly added images
      const { data: initializedImages, error: initError } = await supabase
        .from('gallery_images')
        .select('*')
        .order('id', { ascending: true });
        
      if (initError) {
        console.error('Error fetching initialized gallery images:', initError);
        return defaultImages;
      }
      
      return initializedImages || defaultImages;
    }
    
    return images;
  } catch (error) {
    console.error('Error in getAllImages:', error);
    return initializeDefaultImages();
  }
};

// Add a new image
export const addImage = async (image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> => {
  try {
    // Insert image metadata into Supabase
    const { data, error } = await supabase
      .from('gallery_images')
      .insert([image])
      .select()
      .single();

    if (error) {
      console.error('Error adding image to Supabase:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error adding image:', error);
    throw new Error('Failed to add image');
  }
};

// Update an existing image
export const updateImage = async (id: number, updates: Partial<GalleryImage>): Promise<GalleryImage | null> => {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating image:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating image:', error);
    throw new Error('Failed to update image');
  }
};

// Delete an image
export const deleteImage = async (id: number): Promise<boolean> => {
  try {
    // First, get the image to find its Cloudinary public_id
    const { data: image, error: fetchError } = await supabase
      .from('gallery_images')
      .select('public_id')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching image for deletion:', fetchError);
      throw fetchError;
    }

    // If image has a public_id, delete it from Cloudinary via our edge function
    if (image?.public_id) {
      try {
        const response = await fetch('/api/delete-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ public_id: image.public_id }),
        });

        if (!response.ok) {
          console.warn('Could not delete image from Cloudinary:', await response.text());
        }
      } catch (cloudinaryError) {
        console.warn('Error deleting from Cloudinary:', cloudinaryError);
        // Continue with deletion in Supabase even if Cloudinary deletion fails
      }
    }

    // Delete from Supabase
    const { error: deleteError } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting image from Supabase:', deleteError);
      throw deleteError;
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

// Upload an image to Cloudinary via our secure edge function
export const uploadImage = async (file: File, alt: string, category: string): Promise<GalleryImage> => {
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);
    
    // Upload to Cloudinary via our Supabase Edge Function
    const uploadResponse = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${await uploadResponse.text()}`);
    }

    const cloudinaryData = await uploadResponse.json();
    
    // Add the image metadata to our database
    const newImage = await addImage({
      src: cloudinaryData.secure_url,
      alt,
      category,
      public_id: cloudinaryData.public_id
    });
    
    return newImage;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};
