
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReservationForm from '@/components/Reservation';
import { Phone, Mail, Clock } from 'lucide-react';

const ReservationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add Trustmary widget script
    const script = document.createElement('script');
    script.src = 'https://widget.trustmary.com/tL1CGHy3S';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
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
              
              <div className="mt-12 p-6 bg-infinito-100 rounded-xl animate-fade-in-up animate-delay-300">
                <h3 className="text-lg font-medium mb-4">Dettagli della Location</h3>
                <ul className="space-y-2 text-infinito-700">
                  <li>• Capacità: Fino a 300 ospiti</li>
                  <li>• Diversi spazi disponibili</li>
                  <li>• Servizi completi di catering</li>
                  <li>• Attrezzature audiovisive</li>
                  <li>• Ampio parcheggio</li>
                  <li>• Accessibile per sedie a rotelle</li>
                </ul>
              </div>
            </div>
            
            {/* Reservation Form */}
            <div className="lg:col-span-2 order-1 lg:order-2 animate-fade-in-up">
              <ReservationForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="text-3xl font-serif mb-4">La Nostra Posizione</h2>
            <p className="text-infinito-700 max-w-2xl mx-auto">
              L'infinito è situato nel cuore di Milano, facilmente raggiungibile con i mezzi pubblici e con ampio parcheggio.
            </p>
          </div>
          
          <div className="mx-auto animate-fade-in-up">
            <div style={{overflow:"hidden", maxWidth:"100%", width:"700px", height:"500px"}} className="mx-auto rounded-xl shadow-md">
              <div id="google-maps-display" style={{height:"100%", width:"100%", maxWidth:"100%"}}>
                <iframe 
                  style={{height:"100%", width:"100%", border:"0"}} 
                  frameBorder="0" 
                  src="https://www.google.com/maps/embed/v1/place?q=sala+l+infinito+senise&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                  allowFullScreen
                  title="L'infinito Location"
                ></iframe>
              </div>
              <style>{`#google-maps-display img.text-marker{max-width:none!important;background:none!important;}img{max-width:none}`}</style>
            </div>
          </div>
        </div>
      </section>
      
      {/* Review Section */}
      <section className="py-16 px-6 bg-infinito-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="text-3xl font-serif mb-4">La Tua Opinione</h2>
            <p className="text-infinito-700 max-w-2xl mx-auto">
              Sei soddisfatto del nostro servizio? Lascia una recensione e aiutaci a migliorare!
            </p>
          </div>
          
          <div className="mx-auto animate-fade-in-up">
            {/* Testimonials section moved directly under La Tua Opinione */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif text-center mb-8">Ecco cosa dicono i nostri clienti</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Testimonial cards would go here */}
              </div>
            </div>
            
            {/* Trustmary widget will be injected here */}
            <div id="trustmary-widget" className="mx-auto"></div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ReservationPage;
