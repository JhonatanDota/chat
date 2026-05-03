import { format, parseISO, subDays } from "date-fns";

export function parseDate(date: string): Date {
  return parseISO(date);
}

export function toISOString(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function toISOStringBr(date: Date): string {
  return format(date, "dd/MM/yyyy");
}

export function messageDate(date: Date): string {
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return format(date, "HH:mm");
  }

  const yesterday = subDays(today, 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return "Ontem";
  }

  return format(date, "dd/MM/yyyy HH:mm");
}
