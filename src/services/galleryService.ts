
// This service connects to Cloudinary for image storage on a GitHub-hosted site

import { v4 as uuidv4 } from 'uuid';

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  publicId?: string; // Cloudinary public ID
}

// Initialize with default images
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

// Cloudinary configuration
// Note: In a real-world scenario, these would be environment variables
const CLOUDINARY_CLOUD_NAME = 'demo'; // Replace with your Cloudinary cloud name
const CLOUDINARY_UPLOAD_PRESET = 'ml_default'; // Replace with your upload preset

// Using localStorage for the image metadata, but actual images will be on Cloudinary
const STORAGE_KEY = 'gallery_images';

// Check if data exists in localStorage and load initial data if needed
const initializeStorage = (): void => {
  const storedImages = localStorage.getItem(STORAGE_KEY);
  if (!storedImages) {
    // If there are no images in storage, initialize with defaults
    const defaultImages = initializeDefaultImages();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
  }
};

// Initialize on service import
initializeStorage();

// Get all images
export const getAllImages = async (): Promise<GalleryImage[]> => {
  try {
    const storedImages = localStorage.getItem(STORAGE_KEY);
    if (storedImages) {
      return JSON.parse(storedImages);
    } 
    
    // If there are no images in storage, initialize with defaults
    const defaultImages = initializeDefaultImages();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
    return defaultImages;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return initializeDefaultImages();
  }
};

// Add a new image (metadata only - image already uploaded to Cloudinary)
export const addImage = async (image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> => {
  try {
    const images = await getAllImages();
    
    const newId = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1;
    const newImage = { ...image, id: newId };
    
    const updatedImages = [...images, newImage];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
    
    return newImage;
  } catch (error) {
    console.error('Error adding image:', error);
    throw new Error('Failed to add image');
  }
};

// Update an existing image
export const updateImage = async (id: number, updates: Partial<GalleryImage>): Promise<GalleryImage | null> => {
  try {
    const images = await getAllImages();
    const index = images.findIndex(img => img.id === id);
    
    if (index === -1) return null;
    
    images[index] = { ...images[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    
    return images[index];
  } catch (error) {
    console.error('Error updating image:', error);
    throw new Error('Failed to update image');
  }
};

// Delete an image
export const deleteImage = async (id: number): Promise<boolean> => {
  try {
    const images = await getAllImages();
    const imageToDelete = images.find(img => img.id === id);
    
    // If the image has a Cloudinary public ID, we should delete it from Cloudinary too
    if (imageToDelete?.publicId) {
      try {
        await deleteFromCloudinary(imageToDelete.publicId);
      } catch (cloudinaryError) {
        console.error('Failed to delete from Cloudinary:', cloudinaryError);
        // Continue with local deletion even if Cloudinary deletion fails
      }
    }
    
    const updatedImages = images.filter(img => img.id !== id);
    
    if (updatedImages.length === images.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};

// Delete an image from Cloudinary
const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  // In a real implementation, you would use Cloudinary's API to delete the image
  // For a static site, this would typically be done via a serverless function
  console.log(`Would delete image with public ID ${publicId} from Cloudinary`);
  // In this demo version, we're just logging and not actually deleting from Cloudinary
};

// Upload an image to Cloudinary
export const uploadImage = async (file: File, alt: string, category: string): Promise<GalleryImage> => {
  try {
    // Upload to Cloudinary
    const imageData = await uploadToCloudinary(file);
    
    // Store metadata in localStorage
    const newImage = await addImage({
      src: imageData.secureUrl,
      alt,
      category,
      publicId: imageData.publicId
    });
    
    return newImage;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

// Upload to Cloudinary
const uploadToCloudinary = async (file: File): Promise<{ secureUrl: string, publicId: string }> => {
  return new Promise((resolve, reject) => {
    // For GitHub Pages (static hosting), we need to use Cloudinary's unsigned upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    // Send to Cloudinary API
    fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      resolve({
        secureUrl: data.secure_url,
        publicId: data.public_id
      });
    })
    .catch(error => {
      console.error('Error uploading to Cloudinary:', error);
      
      // FALLBACK: If Cloudinary upload fails, use base64 encoding as before
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target?.result as string;
        // Generate a local ID for the image since we don't have a Cloudinary public ID
        const localId = `local_${uuidv4()}`;
        resolve({
          secureUrl: base64Image,
          publicId: localId
        });
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file as base64'));
      };
      reader.readAsDataURL(file);
    });
  });
};
