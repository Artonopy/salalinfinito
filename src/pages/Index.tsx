
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Image, Star, Users, Music, Utensils, ArrowRight } from 'lucide-react';

const Index = () => {
  // Features data
  const features = [
    {
      icon: <Users className="h-10 w-10 text-infinito-700" />,
      title: "Spacious Venue",
      description: "Accommodate up to 300 guests in our elegant main hall, perfect for weddings and corporate events."
    },
    {
      icon: <Utensils className="h-10 w-10 text-infinito-700" />,
      title: "Gourmet Catering",
      description: "Exceptional cuisine prepared by award-winning chefs tailored to your event's specific needs."
    },
    {
      icon: <Music className="h-10 w-10 text-infinito-700" />,
      title: "State-of-the-art Sound",
      description: "Advanced audio-visual systems ensure perfect sound and lighting for presentations or dancing."
    },
    {
      icon: <Star className="h-10 w-10 text-infinito-700" />,
      title: "Personalized Service",
      description: "Our experienced event coordinators assist with every detail to create a seamless experience."
    }
  ];

  // Gallery preview images
  const galleryPreview = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Elegant wedding reception with chandeliers"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Business conference setup with modern decor"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      alt: "Birthday celebration with decorative lighting"
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
            <span className="inline-block px-3 py-1 bg-infinito-100 text-infinito-900 font-medium text-sm rounded-full mb-3">About L'infinito</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">A Venue Like No Other</h2>
            <p className="text-infinito-700 max-w-3xl mx-auto">
              L'infinito is Milan's premier event venue, offering a perfect blend of timeless elegance and modern amenities. 
              Our spaces are designed to transform your vision into unforgettable experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative animate-fade-in-up">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden image-reveal">
                <img 
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="L'infinito main hall" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-40 md:h-40 bg-infinito-100 rounded-2xl z-[-1]"></div>
            </div>
            
            <div className="animate-fade-in-up animate-delay-200">
              <h3 className="text-2xl font-serif mb-6">Our Story</h3>
              <p className="text-infinito-700 mb-6">
                Founded in 1995, L'infinito was born from a vision to create a space where memorable moments come to life. 
                What began as a historic building has been transformed into a versatile venue while preserving its 
                architectural charm and character.
              </p>
              <p className="text-infinito-700 mb-8">
                Today, we continue our tradition of excellence, hosting everything from intimate gatherings to grand 
                celebrations, with unparalleled attention to detail and personalized service that has made us Milan's 
                venue of choice for discerning clients.
              </p>
              <Link to="/gallery">
                <Button className="group" variant="outline">
                  Explore Our Spaces
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
            <span className="inline-block px-3 py-1 bg-infinito-100 text-infinito-900 font-medium text-sm rounded-full mb-3">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Everything You Need</h2>
            <p className="text-infinito-700 max-w-3xl mx-auto">
              We offer comprehensive services to ensure your event is flawless from start to finish.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <span className="inline-block px-3 py-1 bg-infinito-100 text-infinito-900 font-medium text-sm rounded-full mb-3">Gallery Preview</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Glimpses of Elegance</h2>
            <p className="text-infinito-700 max-w-3xl mx-auto">
              Browse through our collection of past events to get inspired for your own special occasion.
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
                View Full Gallery
                <Image className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-infinito-900 text-white">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Plan Your Event?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-10">
            Contact us today to check availability for your date and start planning your perfect event.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/reservation">
              <Button className="bg-white text-infinito-900 hover:bg-infinito-100 min-w-40 py-6 group">
                Make Reservation
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
