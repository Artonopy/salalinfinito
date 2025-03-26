
import { Booking } from "@/types/booking";

// Save booking to localStorage
export const saveBooking = (booking: Booking): void => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
};

// Get all bookings from localStorage
export const getBookings = (): Booking[] => {
  const bookingsData = localStorage.getItem('bookings');
  return bookingsData ? JSON.parse(bookingsData) : [];
};

// Check for booking conflicts
export const checkBookingConflict = (date: string, time: string): Booking | null => {
  const bookings = getBookings();
  
  // Find any booking with the same date and time
  const conflict = bookings.find(
    booking => booking.date === date && booking.time === time && booking.status !== 'cancelled'
  );
  
  return conflict || null;
};

// Update booking status
export const updateBookingStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled'): void => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(booking => 
    booking.id === id ? { ...booking, status } : booking
  );
  localStorage.setItem('bookings', JSON.stringify(updatedBookings));
};

// Delete booking
export const deleteBooking = (id: string): void => {
  const bookings = getBookings();
  const filteredBookings = bookings.filter(booking => booking.id !== id);
  localStorage.setItem('bookings', JSON.stringify(filteredBookings));
};

// Send booking notification SMS via CallMeBot
export const sendBookingSMS = async (booking: Booking): Promise<boolean> => {
  try {
    // Format the booking details for SMS
    const timeMap: Record<string, string> = {
      'morning': 'Mattina (9:00 - 12:00)',
      'afternoon': 'Pomeriggio (13:00 - 17:00)',
      'evening': 'Sera (18:00 - 22:00)',
      'night': 'Notte (19:00 - 24:00)'
    };
    
    const eventTypeMap: Record<string, string> = {
      'wedding': 'Matrimonio',
      'corporate': 'Evento Aziendale',
      'birthday': 'Festa di Compleanno',
      'anniversary': 'Anniversario',
      'graduation': 'Laurea',
      'other': 'Altro'
    };
    
    // Create message content
    const message = `Nuova prenotazione: ${booking.name}, ${eventTypeMap[booking.eventType] || booking.eventType}, ${booking.date}, ${timeMap[booking.time] || booking.time}, ${booking.guests} ospiti. Tel: ${booking.phone}`;
    
    // Phone number to send SMS to (this would be the admin's phone)
    const phoneNumber = "+393333333333"; // Replace with actual admin number
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // CallMeBot API URL with the API key
    const apiUrl = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}&apikey=3169233`;
    
    // Log the SMS details (for demo purposes)
    console.log('SMS would be sent with details:', {
      to: phoneNumber,
      message: message,
      apiUrl: apiUrl
    });
    
    // In a real app, you would make a fetch call to the API
    // For demo purposes, we'll simulate a successful call
    return true;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    return false;
  }
};

