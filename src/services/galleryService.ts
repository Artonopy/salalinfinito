
// This is a mock service that would typically connect to a backend
// In a real implementation, this would make API calls to your server

import { v4 as uuidv4 } from 'uuid';

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

// Initialize with default images if the server storage is empty
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

// In a real application, this would be stored in a database
// For this demo, we'll use sessionStorage to simulate server storage
const STORAGE_KEY = 'server_gallery_images';

// Get all images
export const getAllImages = async (): Promise<GalleryImage[]> => {
  const storedImages = sessionStorage.getItem(STORAGE_KEY);
  if (storedImages) {
    return JSON.parse(storedImages);
  } 
  
  // If there are no images in "server" storage, initialize with defaults
  const defaultImages = initializeDefaultImages();
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
  return defaultImages;
};

// Add a new image
export const addImage = async (image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> => {
  const images = await getAllImages();
  
  const newId = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1;
  const newImage = { ...image, id: newId };
  
  const updatedImages = [...images, newImage];
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
  
  return newImage;
};

// Update an existing image
export const updateImage = async (id: number, updates: Partial<GalleryImage>): Promise<GalleryImage | null> => {
  const images = await getAllImages();
  const index = images.findIndex(img => img.id === id);
  
  if (index === -1) return null;
  
  images[index] = { ...images[index], ...updates };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  
  return images[index];
};

// Delete an image
export const deleteImage = async (id: number): Promise<boolean> => {
  const images = await getAllImages();
  const updatedImages = images.filter(img => img.id !== id);
  
  if (updatedImages.length === images.length) return false;
  
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
  return true;
};

// Upload an image (in a real app, this would handle file uploads to a server/cloud storage)
export const uploadImage = async (file: File, alt: string, category: string): Promise<GalleryImage> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      // In a real implementation, this would be a URL from your server after upload
      const imageUrl = e.target?.result as string;
      
      const newImage = await addImage({
        src: imageUrl,
        alt,
        category
      });
      
      resolve(newImage);
    };
    
    reader.readAsDataURL(file);
  });
};
