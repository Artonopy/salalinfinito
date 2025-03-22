
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Users, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Il nome deve contenere almeno 2 caratteri.",
  }),
  email: z.string().email({
    message: "Inserisci un indirizzo email valido.",
  }),
  phone: z.string().min(10, {
    message: "Inserisci un numero di telefono valido.",
  }),
  date: z.date({
    required_error: "Seleziona una data per il tuo evento.",
  }),
  time: z.string({
    required_error: "Seleziona una fascia oraria.",
  }),
  guests: z.string({
    required_error: "Seleziona il numero di ospiti.",
  }),
  eventType: z.string({
    required_error: "Seleziona un tipo di evento.",
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ReservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Richiesta di prenotazione inviata con successo!");
      // Reset form after a delay
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  }

  return (
    <div className="w-full max-w-3xl mx-auto glass-card px-6 py-8 rounded-xl">
      {isSuccess ? (
        <div className="text-center py-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <Check size={30} />
          </div>
          <h3 className="text-2xl font-serif mb-3">Grazie!</h3>
          <p className="text-infinito-700 mb-6">
            La tua richiesta di prenotazione è stata inviata con successo. Ti contatteremo a breve per confermare i dettagli.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setIsSuccess(false)}
          >
            Effettua Un'Altra Prenotazione
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif text-center mb-6">Prenota Il Tuo Evento</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Il tuo nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Il tuo indirizzo email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero di Telefono</FormLabel>
                    <FormControl>
                      <Input placeholder="Il tuo numero di telefono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo di Evento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona tipo di evento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="wedding">Matrimonio</SelectItem>
                        <SelectItem value="corporate">Evento Aziendale</SelectItem>
                        <SelectItem value="birthday">Festa di Compleanno</SelectItem>
                        <SelectItem value="anniversary">Anniversario</SelectItem>
                        <SelectItem value="graduation">Laurea</SelectItem>
                        <SelectItem value="other">Altro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data Evento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Scegli una data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fascia Oraria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 opacity-70" />
                          <SelectValue placeholder="Seleziona orario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">Mattina (9:00 - 12:00)</SelectItem>
                        <SelectItem value="afternoon">Pomeriggio (13:00 - 17:00)</SelectItem>
                        <SelectItem value="evening">Sera (18:00 - 22:00)</SelectItem>
                        <SelectItem value="night">Notte (19:00 - 24:00)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero di Ospiti</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="flex items-center">
                          <Users className="mr-2 h-4 w-4 opacity-70" />
                          <SelectValue placeholder="Seleziona ospiti" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-50">1-50 ospiti</SelectItem>
                        <SelectItem value="51-100">51-100 ospiti</SelectItem>
                        <SelectItem value="101-150">101-150 ospiti</SelectItem>
                        <SelectItem value="151-200">151-200 ospiti</SelectItem>
                        <SelectItem value="201+">201+ ospiti</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requisiti Aggiuntivi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Raccontaci eventuali requisiti speciali o domande che hai"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Opzionale: Includi dettagli specifici sul tuo evento
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-infinito-900 hover:bg-infinito-800 py-6 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Invio in corso..." : "Invia Richiesta di Prenotazione"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ReservationForm;
