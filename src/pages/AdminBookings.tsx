
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, updateBookingStatus, deleteBooking, sendTestSMS } from '@/utils/bookingUtils';
import { Booking } from '@/types/booking';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { BookingTabs } from '@/components/admin/BookingTabs';

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    const loadBookings = () => {
      const allBookings = getBookings();
      setBookings(allBookings);
    };

    loadBookings();
    const interval = setInterval(loadBookings, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (id: string, status: 'confirmed' | 'cancelled' | 'pending') => {
    updateBookingStatus(id, status);
    setBookings(getBookings());
    
    const statusMessages = {
      confirmed: 'Prenotazione confermata con successo',
      cancelled: 'Prenotazione cancellata',
      pending: 'Prenotazione impostata come in attesa'
    };
    
    toast.success(statusMessages[status]);
  };

  const handleDelete = (id: string) => {
    deleteBooking(id);
    setBookings(getBookings());
    toast.success('Prenotazione eliminata definitivamente');
  };

  const handleSendTestSMS = async () => {
    try {
      toast.loading('Invio SMS di test in corso...');
      const success = await sendTestSMS();
      
      if (success) {
        toast.success('SMS di test inviato con successo');
      } else {
        toast.error('Errore nell\'invio dell\'SMS di test');
      }
    } catch (error) {
      console.error('Error in handleSendTestSMS:', error);
      toast.error('Errore nell\'invio dell\'SMS di test');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 px-6 py-24">
        <div className="container mx-auto max-w-7xl">
          <AdminHeader 
            title="Gestione Prenotazioni"
            description="Gestisci tutte le richieste di prenotazione per eventi"
            onTestSMS={handleSendTestSMS}
          />

          <BookingTabs 
            bookings={bookings}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminBookings;
