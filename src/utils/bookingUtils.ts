
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

// Send booking notification email
export const sendBookingEmail = async (booking: Booking): Promise<boolean> => {
  try {
    // In a real app, you would use a proper email service API here
    // For demo purposes, we'll simulate sending an email with fetch
    console.log(`Email would be sent to antoniomorell@tiscali.it with booking details:`, booking);
    
    // Simulate API call
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};
