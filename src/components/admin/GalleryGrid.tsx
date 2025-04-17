
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import GalleryImageCard from './GalleryImageCard';
import EmptyGallery from './EmptyGallery';
import type { GalleryImage } from '@/services/galleryService';

interface GalleryGridProps {
  images: GalleryImage[];
  isLoading: boolean;
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: number) => void;
  onAddImage: () => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ 
  images, 
  isLoading, 
  onEdit, 
  onDelete, 
  onAddImage 
}) => {
  if (isLoading && images.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
            <Skeleton className="aspect-[4/3] w-full h-52" />
            <div className="p-4">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-full" />
              <div className="flex space-x-2 mt-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!isLoading && images.length === 0) {
    return <EmptyGallery onAddImage={onAddImage} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <GalleryImageCard
          key={image.id}
          image={image}
          onEdit={onEdit}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
