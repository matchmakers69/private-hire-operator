import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@mui/material";
import { BookingFormData, bookingSchema } from "../_components/BookingForm/validation/bookingSchema";

export function useBookingForm() {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const theme = useTheme();

  const formMethods = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      from: "",
      to: "",
      departureDate: undefined,
      departureTime: undefined,
    },
  });

  return {
    formMethods,
    datePickerOpen,
    setDatePickerOpen,
    timePickerOpen,
    setTimePickerOpen,
    theme,
  };
}
