
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle, LogOut, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllImages, uploadImage, updateImage, deleteImage } from '@/services/galleryService';
import type { GalleryImage } from '@/services/galleryService';
import ImageUploadForm from '@/components/admin/ImageUploadForm';
import GalleryGrid from '@/components/admin/GalleryGrid';

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
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

  const handleSubmit = async (data: {
    file: File | null;
    title: string;
    category: string;
    editingId: number | null;
  }) => {
    setIsLoading(true);
    
    try {
      if (data.editingId !== null) {
        // Update existing image
        const updatedImage = await updateImage(data.editingId, { 
          alt: data.title, 
          category: data.category
        });
        
        if (updatedImage) {
          setImages(prev => 
            prev.map(img => img.id === data.editingId ? updatedImage : img)
          );
          
          toast({
            title: 'Immagine Aggiornata',
            description: 'L\'immagine è stata aggiornata con successo.'
          });
        }
      } else if (data.file && data.title) {
        // Upload new image
        const uploadedImage = await uploadImage(
          data.file,
          data.title,
          data.category
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
      setEditingImage(null);
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
    setEditingImage(image);
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
                <DialogTitle>
                  {editingImage ? 'Modifica Immagine' : 'Aggiungi Nuova Immagine'}
                </DialogTitle>
                <DialogDescription>
                  {editingImage
                    ? 'Modifica i dettagli dell\'immagine selezionata.' 
                    : 'Carica una nuova immagine e aggiungi i dettagli per la galleria.'}
                </DialogDescription>
              </DialogHeader>
              
              <ImageUploadForm 
                onSubmit={handleSubmit} 
                editingImage={editingImage} 
                isLoading={isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <GalleryGrid 
          images={images}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddImage={() => setDialogOpen(true)}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminGallery;
