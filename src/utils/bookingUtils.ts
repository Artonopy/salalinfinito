
import { Booking } from '@/types/booking';

// Save a new booking to localStorage
export const saveBooking = (booking: Booking): void => {
  try {
    // Get existing bookings
    const existingBookings = getBookings();
    
    // Add new booking
    const updatedBookings = [...existingBookings, booking];
    
    // Save to localStorage
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  } catch (error) {
    console.error('Error saving booking:', error);
  }
};

// Get all bookings from localStorage
export const getBookings = (): Booking[] => {
  try {
    const bookingsData = localStorage.getItem('bookings');
    return bookingsData ? JSON.parse(bookingsData) : [];
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    return [];
  }
};

// Update booking status
export const updateBookingStatus = (id: string, status: 'confirmed' | 'cancelled' | 'pending'): void => {
  try {
    const bookings = getBookings();
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  } catch (error) {
    console.error('Error updating booking status:', error);
  }
};

// Delete booking
export const deleteBooking = (id: string): void => {
  try {
    const bookings = getBookings();
    const updatedBookings = bookings.filter(booking => booking.id !== id);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
};

// Check for booking conflicts
export const checkBookingConflict = (date: string, time: string): boolean => {
  try {
    const bookings = getBookings();
    const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed');
    
    // Check if there's already a confirmed booking for the same date and time
    return confirmedBookings.some(booking => 
      booking.date === date && booking.time === time
    );
  } catch (error) {
    console.error('Error checking booking conflicts:', error);
    return false;
  }
};

// Translate event type from English to Italian
const translateEventType = (eventType: string): string => {
  const translations: Record<string, string> = {
    'wedding': 'Matrimonio',
    'corporate': 'Evento Aziendale',
    'birthday': 'Festa di Compleanno',
    'anniversary': 'Anniversario',
    'graduation': 'Laurea',
    'other': 'Altro'
  };
  
  return translations[eventType] || eventType;
};

// Translate time slot from English to Italian
const translateTimeSlot = (timeSlot: string): string => {
  const translations: Record<string, string> = {
    'morning': 'Mattina (9:00 - 12:00)',
    'afternoon': 'Pomeriggio (13:00 - 17:00)',
    'evening': 'Sera (18:00 - 22:00)',
    'night': 'Notte (19:00 - 24:00)'
  };
  
  return translations[timeSlot] || timeSlot;
};

// Send booking notification via SMS using CallMeBot API
export const sendBookingSMS = async (booking: Booking): Promise<boolean> => {
  try {
    // Format the message with all booking details in Italian
    const message = `
Nuova prenotazione! Dettagli:
- Nome: ${booking.name}
- Tipo di evento: ${translateEventType(booking.eventType)}
- Data: ${booking.date}
- Orario: ${translateTimeSlot(booking.time)}
- Numero di ospiti: ${booking.guests}
- Telefono: ${booking.phone}
${booking.email ? `- Email: ${booking.email}` : ''}
${booking.message ? `- Messaggio: ${booking.message}` : ''}
- ID prenotazione: ${booking.id}
- Stato: ${booking.status === 'pending' ? 'In attesa' : booking.status === 'confirmed' ? 'Confermato' : 'Cancellato'}
`;
    
    // Required parameters for CallMeBot
    const apiKey = '3169233';
    const phoneNumber = '393295966969';
    
    // Create the API URL for CallMeBot (WhatsApp API)
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}&apikey=${apiKey}`;
    
    console.log('Invio notifica SMS tramite CallMeBot API:', url);
    
    try {
      // Make the API request to CallMeBot with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Invio SMS fallito:', errorText);
        return false;
      }
      
      const responseText = await response.text();
      console.log('Risposta API SMS:', responseText);
      return true;
    } catch (fetchError) {
      console.error('Errore nella richiesta API:', fetchError);
      // If the error is a timeout or network error, consider the booking saved but SMS failed
      return false;
    }
  } catch (error) {
    console.error('Errore nell\'invio della notifica SMS:', error);
    return false;
  }
};

// Test SMS functionality (for admin page)
export const sendTestSMS = async (): Promise<boolean> => {
  try {
    // Test message in Italian
    const message = "Questo è un messaggio di test dal sistema di prenotazione.";
    
    // Required parameters for CallMeBot
    const apiKey = '3169233';
    const phoneNumber = '393295966969';
    
    // Create the API URL for CallMeBot (WhatsApp API)
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}&apikey=${apiKey}`;
    
    console.log('Invio test SMS tramite CallMeBot API:', url);
    
    try {
      // Make the API request to CallMeBot with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Invio test SMS fallito:', errorText);
        return false;
      }
      
      const responseText = await response.text();
      console.log('Risposta API test SMS:', responseText);
      return true;
    } catch (fetchError) {
      console.error('Errore nella richiesta API:', fetchError);
      return false;
    }
  } catch (error) {
    console.error('Errore nell\'invio del test SMS:', error);
    return false;
  }
};
