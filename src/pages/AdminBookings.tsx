import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getBookings, updateBookingStatus, deleteBooking, sendBookingSMS } from '@/utils/bookingUtils';
import { Booking } from '@/types/booking';
import { toast } from 'sonner';
import { MoreHorizontal, Mail, Trash, CheckCircle, XCircle, Clock, Image, LogOut } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'PPP', { locale: it });
    } catch (error) {
      return dateString;
    }
  };

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

  const sendTestSMS = async () => {
    if (bookings.length === 0) {
      toast.error('Nessuna prenotazione disponibile per testare l\'invio SMS');
      return;
    }

    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Invio SMS di test in corso...',
        success: 'SMS di test inviato con successo',
        error: 'Errore nell\'invio dell\'SMS di test'
      }
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
    
    toast({
      title: 'Disconnessione Effettuata',
      description: 'Sei stato disconnesso dall\'area amministrativa.'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 px-6 py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-serif mb-2">Gestione Prenotazioni</h1>
              <p className="text-muted-foreground">
                Gestisci tutte le richieste di prenotazione per eventi
              </p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2 flex">
              <Button variant="outline" onClick={() => navigate('/admin/gallery')}>
                <Image className="mr-2 h-4 w-4" />
                Gestione Galleria
              </Button>
              <Button variant="outline" onClick={sendTestSMS}>
                <Mail className="mr-2 h-4 w-4" />
                Testa SMS
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Esci
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                Tutte ({bookings.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                In Attesa ({bookings.filter(b => b.status === 'pending').length})
              </TabsTrigger>
              <TabsTrigger value="confirmed">
                Confermate ({bookings.filter(b => b.status === 'confirmed').length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancellate ({bookings.filter(b => b.status === 'cancelled').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="w-full">
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
                    {filteredBookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          Nessuna prenotazione trovata nella categoria selezionata
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBookings.map((booking) => (
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
                                  onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                  Conferma
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="flex items-center cursor-pointer"
                                  onClick={() => handleStatusChange(booking.id, 'pending')}
                                >
                                  <Clock className="mr-2 h-4 w-4 text-orange-500" />
                                  Imposta in attesa
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="flex items-center cursor-pointer" 
                                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                >
                                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                  Cancella
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="flex items-center cursor-pointer text-red-600" 
                                  onClick={() => handleDelete(booking.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Elimina definitivamente
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminBookings;
