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
      src: "https://scontent.fnap4-1.fna.fbcdn.net/v/t39.30808-6/483887796_1176989114431427_8392732447477146151_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=1-1igSg1AuEQ7kNvgHYfKZu&_nc_oc=AdnVyV5HkoVbbN57sDcevCVugsTIAn3rxfb2XXeHmIzlYV9485bYDwjMBGAenZAI_sU&_nc_zt=23&_nc_ht=scontent.fnap4-1.fna&_nc_gid=fYWAsVnwcBUuzxpHKtD93g&oh=00_AYF8LvXS5DPAxnljF1SyRxQj0Q1-ThAI1ZAXeOOwQp9NsQ&oe=67ED64E3",
      alt: "Elegante ricevimento di nozze con lampadari"
    },
    {
      id: 2,
      src: "https://scontent.fnap4-1.fna.fbcdn.net/v/t39.30808-6/480089001_1175293587934313_5674664661415211468_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Xd1Zz6ftMRUQ7kNvgGja99L&_nc_oc=AdmTM3iI-jaY0JA1zLntQDbGTJXdyH_89bs9YY5yD66GfkiMPmSCpdMI7LY1mhw8DLI&_nc_zt=23&_nc_ht=scontent.fnap4-1.fna&_nc_gid=OV46MzdL_iFrVVDtoAJ8Kw&oh=00_AYGKjwrnj_8iElzTlB4h8qIJByoyum2vs8JWYgePlpVEtw&oe=67ED8EF9",
      alt: "Allestimento per conferenza aziendale con arredamento modern"
    },
    {
      id: 3,
      src: "https://scontent.fnap4-1.fna.fbcdn.net/v/t39.30808-6/481295804_1165790878884584_4085292255983119853_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=st1JM-TNW7YQ7kNvgFdb6vI&_nc_oc=AdlGMCm7xGVE2xohBMmmEa3-NhimYorcUJFkilCMa32zKVf10EcA0xDzxLtc7_Wlaug&_nc_zt=23&_nc_ht=scontent.fnap4-1.fna&_nc_gid=XS9xd7LFMdUH9a4HlcuMgg&oh=00_AYElspNwcWgN1pV7_11a-QQbWGCBE8MjEtmp2Y699U2FZA&oe=67ED6449",
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
                  src="https://scontent.fnap4-1.fna.fbcdn.net/v/t39.30808-6/480089001_1175293587934313_5674664661415211468_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Xd1Zz6ftMRUQ7kNvgGja99L&_nc_oc=AdmTM3iI-jaY0JA1zLntQDbGTJXdyH_89bs9YY5yD66GfkiMPmSCpdMI7LY1mhw8DLI&_nc_zt=23&_nc_ht=scontent.fnap4-1.fna&_nc_gid=7eOputo_ffIiDQqodAzfPA&oh=00_AYE3W-I0ahaMn225nOt12mTaHDOmzav8I-Z3p6dhd0uuNA&oe=67ED8EF9" 
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
