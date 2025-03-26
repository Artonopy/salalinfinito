
import React from 'react';
import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Booking } from '@/types/booking';
import { BookingActions } from './BookingActions';

// Map of time values to readable strings
const timeMap: Record<string, string> = {
  'morning': 'Mattina (9:00 - 12:00)',
  'afternoon': 'Pomeriggio (13:00 - 17:00)',
  'evening': 'Sera (18:00 - 22:00)',
  'night': 'Notte (19:00 - 24:00)'
};

// Map of event types to readable strings
const eventTypeMap: Record<string, string> = {
  'wedding': 'Matrimonio',
  'corporate': 'Evento Aziendale',
  'birthday': 'Festa di Compleanno',
  'anniversary': 'Anniversario',
  'graduation': 'Laurea',
  'other': 'Altro'
};

interface BookingTableProps {
  bookings: Booking[];
  onStatusChange: (id: string, status: 'confirmed' | 'cancelled' | 'pending') => void;
  onDelete: (id: string) => void;
}

export const BookingTable: React.FC<BookingTableProps> = ({ 
  bookings, 
  onStatusChange, 
  onDelete 
}) => {
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'PPP', { locale: it });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500 hover:bg-green-600">Confermata</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancellata</Badge>;
      case 'pending':
      default:
        return <Badge variant="secondary">In Attesa</Badge>;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        {bookings.length === 0 && (
          <TableCaption>Nessuna prenotazione disponibile</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Data & Ora</TableHead>
            <TableHead>Tipo Evento</TableHead>
            <TableHead>Ospiti</TableHead>
            <TableHead>Stato</TableHead>
            <TableHead className="text-right">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                Nessuna prenotazione trovata nella categoria selezionata
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="font-medium">{booking.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {booking.phone}
                    {booking.email && <>, {booking.email}</>}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{formatDate(booking.date)}</div>
                  <div className="text-sm text-muted-foreground">
                    {timeMap[booking.time] || booking.time}
                  </div>
                </TableCell>
                <TableCell>
                  {eventTypeMap[booking.eventType] || booking.eventType}
                </TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="text-right">
                  <BookingActions 
                    bookingId={booking.id}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
