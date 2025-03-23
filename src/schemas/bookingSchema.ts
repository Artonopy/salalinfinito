
import { z } from "zod";

export const bookingFormSchema = z.object({
  name: z.string().min(2, {
    message: "Il nome deve contenere almeno 2 caratteri.",
  }),
  email: z.string().email({
    message: "Inserisci un indirizzo email valido.",
  }).optional(),
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

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export const timeSlots = [
  { value: "morning", label: "Mattina (9:00 - 12:00)" },
  { value: "afternoon", label: "Pomeriggio (13:00 - 17:00)" },
  { value: "evening", label: "Sera (18:00 - 22:00)" },
  { value: "night", label: "Notte (19:00 - 24:00)" },
];

export const guestOptions = [
  { value: "1-50", label: "1-50 ospiti" },
  { value: "51-100", label: "51-100 ospiti" },
  { value: "101-150", label: "101-150 ospiti" },
  { value: "151-200", label: "151-200 ospiti" },
  { value: "201+", label: "201+ ospiti" },
];

export const eventTypes = [
  { value: "wedding", label: "Matrimonio" },
  { value: "corporate", label: "Evento Aziendale" },
  { value: "birthday", label: "Festa di Compleanno" },
  { value: "anniversary", label: "Anniversario" },
  { value: "graduation", label: "Laurea" },
  { value: "other", label: "Altro" },
];
