
export interface Booking {
  id: string;
  name: string;
  email?: string;
  phone: string;
  date: string; // ISO date string
  time: string;
  guests: string;
  eventType: string;
  message?: string;
  createdAt: string; // ISO date string
  status: 'pending' | 'confirmed' | 'cancelled';
}
