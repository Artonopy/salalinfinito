
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

// Send booking notification via SMS using CallMeBot API
export const sendBookingSMS = async (booking: Booking): Promise<boolean> => {
  try {
    // Format the message
    const message = `Nuova prenotazione: ${booking.name} - ${booking.eventType} - ${booking.date} - ${booking.time} - ${booking.guests} ospiti`;
    
    // The API key that was provided
    const apiKey = '3169233';
    
    // Create the API URL for CallMeBot
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.callmebot.com/text.php?user=@YourPhone&text=${encodedMessage}&apikey=${apiKey}`;
    
    // Log the SMS being sent (for development/debugging)
    console.log('Sending SMS notification:', message);
    
    // Make the API request to CallMeBot
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Failed to send SMS:', await response.text());
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending SMS notification:', error);
    return false;
  }
};
