
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { GalleryImage } from '@/services/galleryService';

interface ImageUploadFormProps {
  onSubmit: (data: {
    file: File | null;
    title: string;
    category: string;
    editingId: number | null;
  }) => Promise<void>;
  editingImage: GalleryImage | null;
  isLoading: boolean;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ 
  onSubmit, 
  editingImage, 
  isLoading 
}) => {
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState(editingImage?.alt || '');
  const [category, setCategory] = useState(editingImage?.category || '');
  
  React.useEffect(() => {
    if (editingImage) {
      setTitle(editingImage.alt);
      setCategory(editingImage.category);
    } else {
      setTitle('');
      setCategory('');
      setNewImage(null);
      setPreview(null);
    }
  }, [editingImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      file: newImage,
      title,
      category: category || 'Altro',
      editingId: editingImage?.id || null
    });
  };

  const categories = ['Matrimoni', 'Aziendali', 'Compleanni', 'Gala', 'Altro'];

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {!editingImage && (
        <div className="space-y-2">
          <Label htmlFor="image-upload">Immagine</Label>
          <Input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
          />
          {preview && (
            <div className="mt-2 relative aspect-[4/3] rounded-md overflow-hidden">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="image-title">Descrizione</Label>
        <Input 
          id="image-title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Descrizione dell'immagine"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image-category">Categoria</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Seleziona una categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Caricamento...' : editingImage ? 'Aggiorna' : 'Carica'}
        </Button>
      </div>
    </form>
  );
};

export default ImageUploadForm;
