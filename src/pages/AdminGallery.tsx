
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
import { getAllImages, uploadImage, updateImage, deleteImage } from '@/services/galleryService';
import type { GalleryImage } from '@/services/galleryService';
import { Skeleton } from '@/components/ui/skeleton';

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    // Load images from storage
    const loadImages = async () => {
      setIsLoading(true);
      try {
        const serverImages = await getAllImages();
        setImages(serverImages);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Errore',
          description: 'Impossibile caricare le immagini. Riprova più tardi.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (editingId !== null) {
        // Update existing image
        const updatedImage = await updateImage(editingId, { 
          alt: title, 
          category: category || 'Altro'
        });
        
        if (updatedImage) {
          setImages(prev => 
            prev.map(img => img.id === editingId ? updatedImage : img)
          );
          
          toast({
            title: 'Immagine Aggiornata',
            description: 'L\'immagine è stata aggiornata con successo.'
          });
        }
      } else if (newImage && title) {
        // Upload new image
        const uploadedImage = await uploadImage(
          newImage,
          title,
          category || 'Altro'
        );
        
        setImages(prev => [...prev, uploadedImage]);
        
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
        setIsLoading(false);
        return;
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Errore',
        description: 'Si è verificato un errore durante il salvataggio. Riprova più tardi.'
      });
    } finally {
      setIsLoading(false);
      setNewImage(null);
      setPreview(null);
      setTitle('');
      setCategory('');
      setEditingId(null);
      setDialogOpen(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const success = await deleteImage(id);
      
      if (success) {
        setImages(images.filter(img => img.id !== id));
        
        toast({
          title: 'Immagine Eliminata',
          description: 'L\'immagine è stata rimossa dalla galleria.'
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Errore',
          description: 'Impossibile eliminare l\'immagine. Riprova più tardi.'
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Errore',
        description: 'Si è verificato un errore durante l\'eliminazione. Riprova più tardi.'
      });
    } finally {
      setIsLoading(false);
    }
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
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Caricamento...' : editingId !== null ? 'Aggiorna' : 'Carica'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {isLoading && images.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="border rounded-lg overflow-hidden shadow-sm">
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
                    <Button variant="outline" size="sm" onClick={() => handleEdit(image)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Modifica
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500" 
                      onClick={() => handleDelete(image.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Elimina
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && images.length === 0 && (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-600 mb-2">Nessuna immagine nella galleria</p>
            <p className="text-gray-500 mb-6">Inizia aggiungendo la tua prima immagine.</p>
            <Button 
              onClick={() => setDialogOpen(true)}
              className="bg-infinito-900 hover:bg-infinito-800"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Aggiungi Immagine
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminGallery;
