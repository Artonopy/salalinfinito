
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, XCircle, Clock, Trash, MoreHorizontal } from 'lucide-react';

interface BookingActionsProps {
  bookingId: string;
  onStatusChange: (id: string, status: 'confirmed' | 'cancelled' | 'pending') => void;
  onDelete: (id: string) => void;
}

export const BookingActions: React.FC<BookingActionsProps> = ({
  bookingId,
  onStatusChange,
  onDelete
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Azioni</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center cursor-pointer"
          onClick={() => onStatusChange(bookingId, 'confirmed')}
        >
          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          Conferma
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center cursor-pointer"
          onClick={() => onStatusChange(bookingId, 'pending')}
        >
          <Clock className="mr-2 h-4 w-4 text-orange-500" />
          Imposta in attesa
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center cursor-pointer" 
          onClick={() => onStatusChange(bookingId, 'cancelled')}
        >
          <XCircle className="mr-2 h-4 w-4 text-red-500" />
          Cancella
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center cursor-pointer text-red-600" 
          onClick={() => onDelete(bookingId)}
        >
          <Trash className="mr-2 h-4 w-4" />
          Elimina definitivamente
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
