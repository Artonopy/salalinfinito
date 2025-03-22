
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
      alt: "Elegant wedding reception with chandeliers",
      category: "Weddings"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Business conference setup with modern decor",
      category: "Corporate"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Birthday celebration with decorative lighting",
      category: "Birthdays"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Gala dinner with formal table settings",
      category: "Galas"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Elegant wedding ceremony setup",
      category: "Weddings"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "DJ booth at a corporate evening event",
      category: "Corporate"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Children's birthday party with colorful decorations",
      category: "Birthdays"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Charity gala with ornate decorations",
      category: "Galas"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Wedding dinner setup with floral centerpieces",
      category: "Weddings"
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
            <span className="inline-block px-3 py-1 bg-infinito-100 text-infinito-900 font-medium text-sm rounded-full mb-3">Our Gallery</span>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Beautiful Moments & Spaces</h1>
            <p className="text-infinito-700 max-w-2xl mx-auto">
              Browse through our collection of past events and venue spaces to get inspired for your special occasion.
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
              Ready to host your own event in our beautiful spaces? Check availability and make a reservation today.
            </p>
            <Link to="/reservation">
              <Button className="bg-infinito-900 hover:bg-infinito-800 text-white">
                Reserve Your Date
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
