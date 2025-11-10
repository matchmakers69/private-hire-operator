"use server";

import { Resend } from "resend";
import { bookingSchema } from "../_components/BookingForm/validation/bookingSchema";
import { BookingFormConfirmationEmail } from "@/shared/emails/BookingFormConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export type BookingFormState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function submitBookingForm(
  _prevState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  try {
    // Konwertuj FormData do obiektu, obsługując daty
    const rawData: Record<string, unknown> = {};
    
    formData.forEach((value, key) => {
      rawData[key] = value;
    });

    // Parsuj daty jeśli są stringami
    if (rawData.departureDate && typeof rawData.departureDate === 'string') {
      rawData.departureDate = new Date(rawData.departureDate);
    }
    if (rawData.departureTime && typeof rawData.departureTime === 'string') {
      rawData.departureTime = new Date(rawData.departureTime);
    }

    const validation = bookingSchema.safeParse(rawData);

    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return {
        success: false,
        error: firstError?.message || "Please check all fields and try again",
      };
    }

    const data = validation.data;
    console.log(data)

    // Wyślij email z danymi z formularza
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [data.email],
      subject: "Booking Confirmation - Thank you for your request",
      react: BookingFormConfirmationEmail({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        from: data.from,
        to: data.to,
        departureDate: data.departureDate?.toLocaleDateString("en-GB") || "",
        departureTime: data.departureTime?.toLocaleTimeString("en-GB", { 
          hour: '2-digit', 
          minute: '2-digit' 
        }) || "",
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "Failed to send confirmation email. Please try again.",
      };
    }

    return {
      success: true,
      message: "Success! Your booking request has been sent. Check your email for confirmation.",
    };
  } catch (error) {
    console.error("Server action error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}