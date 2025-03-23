
import React, { useState } from 'react';
import { toast } from "sonner";
import { 
  checkBookingConflict, 
  saveBooking, 
  sendBookingEmail 
} from "@/utils/bookingUtils";
import BookingForm from './reservation/BookingForm';
import BookingSuccess from './reservation/BookingSuccess';
import { Booking } from "@/types/booking";

const ReservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (newBooking: Booking) => {
    setIsSubmitting(true);
    
    // Check for booking conflicts
    const conflict = checkBookingConflict(newBooking.date, newBooking.time);
    
    if (conflict) {
      setIsSubmitting(false);
      toast.error("La data e l'orario selezionati non sono disponibili. Seleziona un altro orario o data.");
      return;
    }
    
    // Save booking to localStorage
    saveBooking(newBooking);
    
    // Send email notification
    sendBookingEmail(newBooking)
      .then(success => {
        if (!success) {
          toast.warning("La prenotazione è stata salvata, ma potrebbe esserci stato un problema con l'invio dell'email di notifica.");
        }
      });
    
    // Update UI
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Richiesta di prenotazione inviata con successo!");
    }, 1500);
  };

  const handleReset = () => {
    setIsSuccess(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto glass-card px-6 py-8 rounded-xl">
      {isSuccess ? (
        <BookingSuccess onReset={handleReset} />
      ) : (
        <BookingForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      )}
    </div>
  );
};

export default ReservationForm;
