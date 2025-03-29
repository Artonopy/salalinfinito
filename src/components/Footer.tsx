
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook } from 'lucide-react';
import TikTokIcon from './icons/TikTokIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-infinito-950 text-white/80 pt-16 pb-8">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Contact Information */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-6">L'infinito</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-infinito-300 mt-0.5" />
                <span>123 Viale Eleganza<br />Milano, Italia 20121</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-infinito-300" />
                <a 
                  href="tel:+391234567890" 
                  className="hover:text-white transition-colors"
                >
                  +39 123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-infinito-300" />
                <a 
                  href="mailto:info@linfinito.com" 
                  className="hover:text-white transition-colors"
                >
                  info@linfinito.com
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-infinito-300" />
                <span>Lun-Ven: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl text-white mb-6">Collegamenti Rapidi</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="hover:text-white transition-colors hover:pl-1 inline-block duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className="hover:text-white transition-colors hover:pl-1 inline-block duration-200"
                >
                  Galleria
                </Link>
              </li>
              <li>
                <Link 
                  to="/reservation" 
                  className="hover:text-white transition-colors hover:pl-1 inline-block duration-200"
                >
                  Prenota
                </Link>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="hover:text-white transition-colors hover:pl-1 inline-block duration-200"
                >
                  Servizi
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="hover:text-white transition-colors hover:pl-1 inline-block duration-200"
                >
                  Chi Siamo
                </a>
              </li>
              {/* Removed Admin link */}
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="font-serif text-xl text-white mb-6">Seguici</h3>
            <p className="mb-6">
              Seguici sui social media per aggiornamenti, ispirazioni per eventi e offerte esclusive.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.tiktok.com/@sala.l.infinito" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-infinito-800/50 flex items-center justify-center hover:bg-infinito-700 transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon size={20} />
              </a>
              <a 
                href="https://www.facebook.com/p/Linfinito-100063610494417/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-infinito-800/50 flex items-center justify-center hover:bg-infinito-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright & Credits */}
        <div className="pt-8 border-t border-infinito-800/50 text-center text-sm text-infinito-400">
          <p>© {currentYear} L'infinito. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
