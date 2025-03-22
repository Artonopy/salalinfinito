
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

const GalleryPage = () => {
  // Gallery images with categories
  const galleryImages = [
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
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Elegante allestimento per cerimonia nuziale",
      category: "Matrimoni"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Postazione DJ per un evento aziendale serale",
      category: "Aziendali"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Festa di compleanno per bambini con decorazioni colorate",
      category: "Compleanni"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Gala di beneficenza con decorazioni ornate",
      category: "Gala"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Allestimento per cena nuziale con centrotavola floreali",
      category: "Matrimoni"
    }
  ];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Page Header */}
      <section className="pt-32 pb-12 px-6 bg-infinito-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center animate-fade-in-up">
            <span className="inline-block px-3 py-1 bg-infinito-100 text-infinito-900 font-medium text-sm rounded-full mb-3">La Nostra Galleria</span>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Momenti e Spazi Bellissimi</h1>
            <p className="text-infinito-700 max-w-2xl mx-auto">
              Sfoglia la nostra collezione di eventi passati e spazi per trovare ispirazione per la tua occasione speciale.
            </p>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Gallery images={galleryImages} className="mb-16" />
          
          <div className="text-center animate-fade-in-up">
            <p className="text-infinito-700 mb-6 max-w-2xl mx-auto">
              Pronto a ospitare il tuo evento nei nostri bellissimi spazi? Verifica la disponibilità e prenota oggi.
            </p>
            <Link to="/reservation">
              <Button className="bg-infinito-900 hover:bg-infinito-800 text-white">
                Prenota La Tua Data
                <CalendarDays className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default GalleryPage;
