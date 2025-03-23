
import React from 'react';
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingSuccessProps {
  onReset: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ onReset }) => {
  return (
    <div className="text-center py-10 animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
        <Check size={30} />
      </div>
      <h3 className="text-2xl font-serif mb-3">Grazie!</h3>
      <p className="text-infinito-700 mb-6">
        La tua richiesta di prenotazione è stata inviata con successo. Ti contatteremo a breve per confermare i dettagli.
      </p>
      <Button 
        variant="outline" 
        onClick={onReset}
      >
        Effettua Un'Altra Prenotazione
      </Button>
    </div>
  );
};

export default BookingSuccess;
