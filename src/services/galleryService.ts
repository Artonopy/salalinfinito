
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

// Using localStorage instead of sessionStorage for persistence across browser sessions
// For a GitHub-hosted site, localStorage is the most persistent client-side option
const STORAGE_KEY = 'gallery_images';

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

// Add a new image
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
    const updatedImages = images.filter(img => img.id !== id);
    
    if (updatedImages.length === images.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};

// Upload an image (handles file uploads to localStorage as base64)
export const uploadImage = async (file: File, alt: string, category: string): Promise<GalleryImage> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        // Store the base64 image data
        const imageUrl = e.target?.result as string;
        
        try {
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
      
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};
