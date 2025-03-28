import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReservationForm from '@/components/Reservation';
import { Phone, Mail, Clock } from 'lucide-react';

const ReservationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add Trustmary widget script inside the correct div
    const widgetContainer = document.getElementById('trustmary-widget');
    if (widgetContainer) {
      const script = document.createElement('script');
      script.src = 'https://widget.trustmary.com/nEksDBQQm';
      script.async = true;
      widgetContainer.appendChild(script);
    }
  }, []);

  // Contact info details
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-infinito-700" />, 
      title: "Telefono", 
      content: "+39 329 596 6969",
    },
    {
      icon: <Mail className="h-6 w-6 text-infinito-700" />, 
      title: "Email", 
      content: "@linfinito.com",
      description: "Rispondiamo alle richieste solitamente entro 24 ore."
    },
    {
      icon: <Clock className="h-6 w-6 text-infinito-700" />, 
      title: "Disponibilità", 
      content: "7 Giorni su 7",
      description: "La location è disponibile per eventi durante tutto l'anno."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Page Header */}
      <section className="pt-32 pb-12 px-6 bg-infinito-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center animate-fade-in-up">
            <span className="inline-block px-3 py-1 bg-infinito-100 text-infinito-900 font-medium text-sm rounded-full mb-3">Prenotazioni</span>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Prenota Il Tuo Evento</h1>
            <p className="text-infinito-700 max-w-2xl mx-auto">
              Completa il modulo sottostante per richiedere una prenotazione a L'infinito, e il nostro team ti contatterà a breve per confermare i dettagli.
            </p>
          </div>
        </div>
      </section>
      
      {/* Reservation Form Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-infinito-50/50 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-serif mb-6">Informazioni di Contatto</h2>
              
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="p-3 bg-infinito-100 rounded-lg mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                      <p className="text-infinito-900 font-medium mb-1">{item.content}</p>
                      <p className="text-infinito-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reservation Form */}
            <div className="lg:col-span-2 order-1 lg:order-2 animate-fade-in-up">
              <ReservationForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Review Section - Trustmary Widget Moved Here */}
      <section className="py-16 px-6 bg-infinito-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="text-3xl font-serif mb-4">Ecco cosa dicono i nostri clienti</h2>
            <p className="text-infinito-700 max-w-2xl mx-auto">
              Leggi le recensioni dei nostri clienti e scopri perché scelgono L'Infinito per i loro eventi speciali.
            </p>
          </div>
          
          {/* Trustmary widget injected here */}
          <div id="trustmary-widget" className="mx-auto animate-fade-in-up mb-12"></div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ReservationPage;
