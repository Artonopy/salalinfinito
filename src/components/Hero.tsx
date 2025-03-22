import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
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
  return <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div ref={heroRef} className="absolute inset-0 -z-10 bg-infinito-500" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2968)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '120%',
      top: '-10%'
    }} />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-infinito-950/70 via-infinito-800/30 to-background/95 z-0" />
      
      {/* Content */}
      <div className="relative h-full z-10 flex flex-col items-center justify-center px-6 pt-16">
        <div className="max-w-4xl text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 mb-6 bg-white/20 backdrop-blur-sm text-white font-medium text-sm rounded-full border border-white/30">Senise PZ</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-white mb-6 drop-shadow-md">
              L'<span className="text-infinito-200">infinito</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 drop-shadow leading-relaxed">
              Where timeless elegance meets modern luxury for your unforgettable events
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link to="/gallery">
                <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm min-w-40 py-6 text-base">
                  View Gallery
                </Button>
              </Link>
              <Link to="/reservation">
                <Button className="bg-infinito-900 hover:bg-infinito-800 text-white min-w-40 py-6 text-base group">
                  Book Your Event
                  <Calendar className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
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
    </div>;
};
export default Hero;