
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import type { GalleryImage } from '@/services/galleryService';

interface GalleryImageCardProps {
  image: GalleryImage;
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

const GalleryImageCard: React.FC<GalleryImageCardProps> = ({ 
  image, 
  onEdit, 
  onDelete, 
  isLoading 
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img 
          src={image.src} 
          alt={image.alt} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="inline-block px-2 py-1 text-xs bg-infinito-100 text-infinito-900 rounded-full mb-2">
              {image.category}
            </span>
            <p className="text-sm text-infinito-700">{image.alt}</p>
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => onEdit(image)}>
            <Edit className="h-4 w-4 mr-1" />
            Modifica
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-500" 
            onClick={() => onDelete(image.id)}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Elimina
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GalleryImageCard;
