
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Image as ImageIcon } from 'lucide-react';

interface EmptyGalleryProps {
  onAddImage: () => void;
}

const EmptyGallery: React.FC<EmptyGalleryProps> = ({ onAddImage }) => {
  return (
    <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
      <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <p className="text-xl font-medium text-gray-600 mb-2">Nessuna immagine nella galleria</p>
      <p className="text-gray-500 mb-6">Inizia aggiungendo la tua prima immagine.</p>
      <Button 
        onClick={onAddImage}
        className="bg-infinito-900 hover:bg-infinito-800"
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi Immagine
      </Button>
    </div>
  );
};

export default EmptyGallery;
