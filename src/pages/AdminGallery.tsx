import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { PlusCircle, Trash2, LogOut, Edit, Image as ImageIcon, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    const savedImages = localStorage.getItem('galleryImages');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, [navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages(files);

      const fileReaders = files.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReaders).then(setPreviews);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId !== null) {
      const updatedImages = images.map(img => 
        img.id === editingId 
          ? { ...img, alt: title, category: category } 
          : img
      );
      
      setImages(updatedImages);
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
      
      toast({
        title: 'Immagine Aggiornata',
        description: 'L\'immagine è stata aggiornata con successo.'
      });
    } else if (newImages.length > 0 && previews.length > 0) {
      const newImageObjects = newImages.map((file, index) => {
        return {
          id: images.length > 0 ? Math.max(...images.map(img => img.id)) + index + 1 : index + 1,
          src: previews[index],
          alt: title || 'Senza descrizione',
          category: category || 'Altro'
        };
      });
      
      const updatedImages = [...images, ...newImageObjects];
      setImages(updatedImages);
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
      
      toast({
        title: 'Immagini Caricate',
        description: 'Le immagini sono state aggiunte alla galleria.'
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Errore',
        description: 'Per favore seleziona almeno un\'immagine.'
      });
      return;
    }
    
    setNewImages([]);
    setPreviews([]);
    setTitle('');
    setCategory('');
    setEditingId(null);
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
    
    toast({
      title: 'Immagine Eliminata',
      description: 'L\'immagine è stata rimossa dalla galleria.'
    });
  };

  const handleEdit = (image: GalleryImage) => {
    setTitle(image.alt);
    setCategory(image.category);
    setEditingId(image.id);
    setDialogOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
    
    toast({
      title: 'Disconnessione Effettuata',
      description: 'Sei stato disconnesso dall\'area amministrativa.'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-6 py-20 flex-1">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi Immagini
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aggiungi Immagini</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Label htmlFor="image-upload">Immagini</Label>
              <Input id="image-upload" type="file" accept="image/*" multiple onChange={handleImageChange} />
              <div className="grid grid-cols-3 gap-2">
                {previews.map((src, index) => (
                  <img key={index} src={src} alt="Anteprima" className="w-full h-24 object-cover" />
                ))}
              </div>
              <Label htmlFor="image-title">Descrizione (opzionale)</Label>
              <Input id="image-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Descrizione" />
              <Label htmlFor="image-category">Categoria</Label>
              <Select value={category} onValueChange={(value) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona una categoria" />
                </SelectTrigger>
                <SelectContent>
                  {['Matrimoni', 'Aziendali', 'Compleanni', 'Gala', 'Altro'].map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button type="submit">Carica</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default AdminGallery;
