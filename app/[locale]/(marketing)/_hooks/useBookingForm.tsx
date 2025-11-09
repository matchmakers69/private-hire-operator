import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import emailjs from "@emailjs/browser";
import { useTheme } from "@mui/material";
import { BookingFormData, bookingSchema } from "../_components/BookingForm/validation/bookingSchema";

export type SubmitStatus = "idle" | "loading" | "success" | "error";

export function useBookingForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
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

  const { reset } = formMethods;

  const submitBooking = async (data: BookingFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      //   await emailjs.send(
      //     process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      //     process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      //     {
      //       firstName: data.firstName,
      //       lastName: data.lastName,
      //       email: data.email,
      //       phone: data.phone,
      //       from: data.from,
      //       to: data.to,
      //       departureDate: data.departureDate?.toLocaleDateString("en-GB"),
      //       departureTime: data.departureTime?.toLocaleTimeString("en-GB"),
      //     },
      //     process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      //   );

      setSubmitStatus("success");
      reset();

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  return {
    formMethods,
    submitBooking,
    submitStatus,
    errorMessage,
    datePickerOpen,
    setDatePickerOpen,
    timePickerOpen,
    setTimePickerOpen,
    theme,
  };
}
