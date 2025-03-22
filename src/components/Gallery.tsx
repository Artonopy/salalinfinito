
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
  images?: { id: number; src: string; alt: string; category?: string }[];
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ images: propImages, className }) => {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [images, setImages] = useState<{ id: number; src: string; alt: string; category?: string }[]>([]);
  
  // Load images from localStorage or use prop images
  useEffect(() => {
    if (propImages && propImages.length > 0) {
      setImages(propImages);
    } else {
      const savedImages = localStorage.getItem('galleryImages');
      if (savedImages) {
        setImages(JSON.parse(savedImages));
      }
    }
  }, [propImages]);
  
  const categories = ['Tutti', ...new Set(images.map(img => img.category || 'Altro'))];
  
  const filteredImages = activeCategory && activeCategory !== 'Tutti'
    ? images.filter(img => img.category === activeCategory)
    : images;

  const openModal = (id: number) => setActiveImage(id);
  const closeModal = () => setActiveImage(null);
  
  const goToNext = () => {
    if (activeImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === activeImage);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setActiveImage(filteredImages[nextIndex].id);
  };
  
  const goToPrev = () => {
    if (activeImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === activeImage);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setActiveImage(filteredImages[prevIndex].id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft') goToPrev();
  };
  
  return (
    <div className={cn("w-full", className)} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 text-sm rounded-full transition-all duration-300",
                activeCategory === category 
                  ? "bg-infinito-900 text-white" 
                  : "bg-infinito-100 text-infinito-800 hover:bg-infinito-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredImages.map((image, index) => (
          <div 
            key={image.id}
            className={cn(
              "image-reveal cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 aspect-[4/3]",
              `animate-fade-in animate-delay-${(index % 5) * 100}`
            )}
            onClick={() => openModal(image.id)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      
      {/* Lightbox Modal */}
      {activeImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
             onClick={closeModal}>
          <div 
            className="relative max-w-6xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/30 p-2 rounded-full backdrop-blur-sm transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            {/* Navigation Buttons */}
            <button 
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 p-2 rounded-full backdrop-blur-sm transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            
            <button 
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 p-2 rounded-full backdrop-blur-sm transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
            
            {/* Active Image */}
            <img
              src={images.find(img => img.id === activeImage)?.src}
              alt={images.find(img => img.id === activeImage)?.alt || ''}
              className="max-h-[80vh] max-w-full object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
