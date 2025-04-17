
// This service connects to a simulated backend for image storage
// In a real implementation with a GitHub-hosted site, you would use services 
// like Cloudinary, Firebase Storage, or Supabase Storage

import { v4 as uuidv4 } from 'uuid';

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

// Initialize with default images if the storage is empty
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

// Remote storage simulation using localStorage with versioning to ensure data consistency
const STORAGE_KEY = 'gallery_images_v2';
const LAST_UPDATE_KEY = 'gallery_last_update';

// Get last update timestamp
const getLastUpdateTimestamp = (): number => {
  const timestamp = localStorage.getItem(LAST_UPDATE_KEY);
  return timestamp ? parseInt(timestamp, 10) : 0;
};

// Set last update timestamp
const setLastUpdateTimestamp = (): void => {
  localStorage.setItem(LAST_UPDATE_KEY, Date.now().toString());
};

// Fetch remote data (simulated)
const fetchRemoteData = async (): Promise<GalleryImage[]> => {
  // In a real implementation, this would be an API call to a backend service
  // For now, we'll use localStorage as our "remote" storage
  try {
    const storedImages = localStorage.getItem(STORAGE_KEY);
    if (storedImages) {
      return JSON.parse(storedImages);
    }
    return [];
  } catch (error) {
    console.error("Error fetching remote data:", error);
    return [];
  }
};

// Save remote data (simulated)
const saveRemoteData = async (images: GalleryImage[]): Promise<boolean> => {
  // In a real implementation, this would be an API call to a backend service
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    setLastUpdateTimestamp();
    return true;
  } catch (error) {
    console.error("Error saving remote data:", error);
    return false;
  }
};

// Get all images
export const getAllImages = async (): Promise<GalleryImage[]> => {
  try {
    // Fetch data from "remote" storage
    const remoteImages = await fetchRemoteData();
    
    // If there are images in remote storage, return them
    if (remoteImages && remoteImages.length > 0) {
      return remoteImages;
    }
    
    // If there are no images in remote storage, initialize with defaults
    // and save to remote storage
    const defaultImages = initializeDefaultImages();
    await saveRemoteData(defaultImages);
    return defaultImages;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return initializeDefaultImages();
  }
};

// Add a new image
export const addImage = async (image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> => {
  try {
    // Get current images from "remote" storage
    const images = await getAllImages();
    
    // Create new image with unique ID
    const newId = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1;
    const newImage = { ...image, id: newId };
    
    // Update remote storage
    const updatedImages = [...images, newImage];
    await saveRemoteData(updatedImages);
    
    return newImage;
  } catch (error) {
    console.error('Error adding image:', error);
    throw new Error('Failed to add image');
  }
};

// Update an existing image
export const updateImage = async (id: number, updates: Partial<GalleryImage>): Promise<GalleryImage | null> => {
  try {
    // Get current images from "remote" storage
    const images = await getAllImages();
    const index = images.findIndex(img => img.id === id);
    
    if (index === -1) return null;
    
    // Update image
    images[index] = { ...images[index], ...updates };
    
    // Save to remote storage
    await saveRemoteData(images);
    
    return images[index];
  } catch (error) {
    console.error('Error updating image:', error);
    throw new Error('Failed to update image');
  }
};

// Delete an image
export const deleteImage = async (id: number): Promise<boolean> => {
  try {
    // Get current images from "remote" storage
    const images = await getAllImages();
    const updatedImages = images.filter(img => img.id !== id);
    
    if (updatedImages.length === images.length) return false;
    
    // Save to remote storage
    await saveRemoteData(updatedImages);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};

// Upload an image (handles file uploads to "remote" storage as base64)
export const uploadImage = async (file: File, alt: string, category: string): Promise<GalleryImage> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        // Get the base64 image data
        const imageUrl = e.target?.result as string;
        
        try {
          // Add image to "remote" storage
          const newImage = await addImage({
            src: imageUrl,
            alt,
            category
          });
          
          resolve(newImage);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      // Read file as Data URL (base64)
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};
