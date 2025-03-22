
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleParallax = () => {
      if (heroRef.current) {
        const scrollValue = window.scrollY;
        const translateY = scrollValue * 0.5;
        heroRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        ref={heroRef}
        className="absolute inset-0 -z-10 bg-infinito-500"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2968)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '120%',
          top: '-10%'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-infinito-950/40 via-transparent to-background/95 z-0" />
      
      {/* Content */}
      <div className="relative h-full z-10 flex flex-col items-center justify-center px-6 pt-16">
        <div className="max-w-4xl text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white mb-4 drop-shadow-sm">
              Where Timeless Elegance<br className="hidden sm:block" /> Meets Modern Luxury
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow">
              L'infinito is the perfect venue for your unforgettable events, offering sophisticated spaces and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/gallery">
                <Button className="bg-white/25 hover:bg-white/35 text-white border border-white/40 backdrop-blur-sm min-w-40 py-6">
                  View Gallery
                </Button>
              </Link>
              <Link to="/reservation">
                <Button className="bg-infinito-900 hover:bg-infinito-800 text-white min-w-40 py-6 group">
                  Make Reservation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <div className="w-1 h-10 rounded-full bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/70 animate-[slide_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
