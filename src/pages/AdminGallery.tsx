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
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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
    } else {
      const defaultImages = [
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
      setImages(defaultImages);
      localStorage.setItem('galleryImages', JSON.stringify(defaultImages));
    }
  }, [navigate]);

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
    } else if (newImage && preview && title) {
      const newId = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1;
      
      const newImageObj = {
        id: newId,
        src: preview,
        alt: title,
        category: category || 'Altro'
      };
      
      const updatedImages = [...images, newImageObj];
      setImages(updatedImages);
      
      localStorage.setItem('galleryImages', JSON.stringify(updatedImages));
      
      toast({
        title: 'Immagine Caricata',
        description: 'L\'immagine è stata aggiunta alla galleria.'
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Errore',
        description: 'Per favore seleziona un\'immagine e aggiungi una descrizione.'
      });
      return;
    }
    
    setNewImage(null);
    setPreview(null);
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

  const categories = ['Matrimoni', 'Aziendali', 'Compleanni', 'Gala', 'Altro'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-6 py-20 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif">Gestione Galleria</h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate('/admin/bookings')}>
              <FileText className="mr-2 h-4 w-4" />
              Gestione Prenotazioni
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Esci
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-infinito-900 hover:bg-infinito-800 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Aggiungi Immagine
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId !== null ? 'Modifica Immagine' : 'Aggiungi Nuova Immagine'}</DialogTitle>
                <DialogDescription>
                  {editingId !== null 
                    ? 'Modifica i dettagli dell\'immagine selezionata.' 
                    : 'Carica una nuova immagine e aggiungi i dettagli per la galleria.'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {editingId === null && (
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
                  <Button type="submit">
                    {editingId !== null ? 'Aggiorna' : 'Carica'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
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
                  <Button variant="outline" size="sm" onClick={() => handleEdit(image)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Modifica
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDelete(image.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Elimina
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminGallery;
