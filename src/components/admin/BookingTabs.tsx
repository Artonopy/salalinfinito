
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Booking } from '@/types/booking';
import { BookingTable } from './BookingTable';

interface BookingTabsProps {
  bookings: Booking[];
  activeTab: string;
  onTabChange: (value: string) => void;
  onStatusChange: (id: string, status: 'confirmed' | 'cancelled' | 'pending') => void;
  onDelete: (id: string) => void;
}

export const BookingTabs: React.FC<BookingTabsProps> = ({
  bookings,
  activeTab,
  onTabChange,
  onStatusChange,
  onDelete
}) => {
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full"
    >
      <TabsList className="mb-6">
        <TabsTrigger value="all">
          Tutte ({bookings.length})
        </TabsTrigger>
        <TabsTrigger value="pending">
          In Attesa ({pendingCount})
        </TabsTrigger>
        <TabsTrigger value="confirmed">
          Confermate ({confirmedCount})
        </TabsTrigger>
        <TabsTrigger value="cancelled">
          Cancellate ({cancelledCount})
        </TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="w-full">
        <BookingTable 
          bookings={filteredBookings}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      </TabsContent>
    </Tabs>
  );
};
