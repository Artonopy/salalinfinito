import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Image, Star, Users, Utensils, ArrowRight } from 'lucide-react';

const Index = () => {
  // Features data
  const features = [
    {
      icon: <Users className="h-10 w-10 text-infinito-700" />,
      title: "Spazio Ampio",
      description: "Ospita fino a 300 invitati nella nostra elegante sala principale, perfetta per matrimoni ed eventi aziendali."
    },
    {
      icon: <Utensils className="h-10 w-10 text-infinito-700" />,
      title: "Catering Gourmet",
      description: "Cucina eccezionale preparata da chef premiati e personalizzata in base alle specifiche esigenze del tuo evento."
    },
    {
      icon: <Star className="h-10 w-10 text-infinito-700" />,
      title: "Servizio Personalizzato",
      description: "I nostri coordinatori di eventi esperti ti assistono in ogni dettaglio per creare un'esperienza impeccabile."
    }
  ];

  // Gallery preview images
  const galleryPreview = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Elegante ricevimento di nozze con lampadari"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Allestimento per conferenza aziendale con arredamento moderno"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Celebrazione di compleanno con illuminazione decorativa"
    }
  ];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* About Section */}
      <section className="py-20 px-6" id="about">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block px-3 py-1 bg-infinito-100 text-infinito-900 font-medium text-sm rounded-full mb-3">Chi Siamo</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Una Location Senza Paragoni</h2>
            <p className="text-infinito-700 max-w-3xl mx-auto">
              L'infinito è la location per eventi di punta di Milano, che offre un perfetto connubio tra eleganza senza tempo e comfort moderni.
              I nostri spazi sono progettati per trasformare la tua visione in esperienze indimenticabili.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative animate-fade-in-up">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden image-reveal">
                <img 
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Salone principale de L'infinito" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-40 md:h-40 bg-infinito-100 rounded-2xl z-[-1]"></div>
            </div>
            
            <div className="animate-fade-in-up animate-delay-200">
              <h3 className="text-2xl font-serif mb-6">La Nostra Storia</h3>
              <p className="text-infinito-700 mb-6">
                Fondato nel 1995, L'infinito è nato dalla visione di creare uno spazio dove i momenti memorabili prendono vita.
                Quello che era un edificio storico è stato trasformato in una location versatile mantenendo il suo fascino 
                architettonico e il suo carattere.
              </p>
              <p className="text-infinito-700 mb-8">
                Oggi, continuiamo la nostra tradizione di eccellenza, ospitando dalle riunioni intime alle grandi 
                celebrazioni, con un'attenzione ai dettagli e un servizio personalizzato che ci ha resi la location 
                preferita a Milano per clienti esigenti.
              </p>
              <Link to="/gallery">
                <Button className="group" variant="outline">
                  Esplora i Nostri Spazi
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 bg-infinito-50" id="services">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block px-3 py-1 bg-infinito-100 text-infinito-900 font-medium text-sm rounded-full mb-3">I Nostri Servizi</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Tutto Ciò di Cui Hai Bisogno</h2>
            <p className="text-infinito-700 max-w-3xl mx-auto">
              Offriamo servizi completi per garantire che il tuo evento sia impeccabile dall'inizio alla fine.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center animate-fade-in-up animate-delay-${index * 100}`}
              >
                <div className="mb-6 p-4 bg-infinito-100 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif mb-3">{feature.title}</h3>
                <p className="text-infinito-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Gallery Preview Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block px-3 py-1 bg-infinito-100 text-infinito-900 font-medium text-sm rounded-full mb-3">Anteprima Galleria</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Scorci di Eleganza</h2>
            <p className="text-infinito-700 max-w-3xl mx-auto">
              Sfoglia la nostra collezione di eventi passati per trovare ispirazione per la tua occasione speciale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {galleryPreview.map((image, index) => (
              <div 
                key={image.id} 
                className={`image-reveal rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 aspect-[4/3] animate-fade-in-up animate-delay-${index * 100}`}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center animate-fade-in-up">
            <Link to="/gallery">
              <Button className="bg-infinito-900 hover:bg-infinito-800 text-white group">
                Visualizza Galleria Completa
                <Image className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-infinito-900 text-white">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Pronto a Pianificare il Tuo Evento?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-10">
            Contattaci oggi per verificare la disponibilità per la tua data e iniziare a pianificare il tuo evento perfetto.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/reservation">
              <Button className="bg-white text-infinito-900 hover:bg-infinito-100 min-w-40 py-6 group">
                Prenota Ora
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
