
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';

const GalleryPage = () => {
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
          <Gallery className="mb-16" />
          
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
