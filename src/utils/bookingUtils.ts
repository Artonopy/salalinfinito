
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
    
    // Required parameters for CallMeBot
    const apiKey = '3169233'; // The provided API key
    const phoneNumber = '393489123812'; // Replace with the actual phone number (format: country code + number)
    
    // Create the API URL for CallMeBot (WhatsApp API)
    // Format: https://api.callmebot.com/whatsapp.php?phone=[phone]&text=[message]&apikey=[apikey]
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}&apikey=${apiKey}`;
    
    console.log('Sending SMS notification to CallMeBot API:', url);
    
    // Make the API request to CallMeBot
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send SMS:', errorText);
      return false;
    }
    
    const responseText = await response.text();
    console.log('SMS API response:', responseText);
    return true;
  } catch (error) {
    console.error('Error sending SMS notification:', error);
    return false;
  }
};

// Test SMS functionality (for admin page)
export const sendTestSMS = async (): Promise<boolean> => {
  try {
    // Test message
    const message = "Questo è un messaggio di test dal sistema di prenotazione.";
    
    // Required parameters for CallMeBot
    const apiKey = '3169233'; // The provided API key
    const phoneNumber = '393489123812'; // Replace with the actual phone number (format: country code + number)
    
    // Create the API URL for CallMeBot (WhatsApp API)
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}&apikey=${apiKey}`;
    
    console.log('Sending test SMS to CallMeBot API:', url);
    
    // Make the API request to CallMeBot
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send test SMS:', errorText);
      return false;
    }
    
    const responseText = await response.text();
    console.log('Test SMS API response:', responseText);
    return true;
  } catch (error) {
    console.error('Error sending test SMS:', error);
    return false;
  }
};
