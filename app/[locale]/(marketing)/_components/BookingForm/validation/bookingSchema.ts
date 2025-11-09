import { z } from "zod";

export const bookingSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name can be maximum 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name can be maximum 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can be maximum 15 digits")
    .regex(/^[0-9+\s()-]+$/, "Phone number can only contain digits, +, -, ( ), spaces"),
  from: z
    .string()
    .min(3, "Pickup location must be at least 3 characters")
    .max(200, "Pickup location can be maximum 200 characters"),
  to: z
    .string()
    .min(3, "Destination must be at least 3 characters")
    .max(200, "Destination can be maximum 200 characters"),
  departureDate: z.any().superRefine((value, ctx) => {
    if (!value) {
      ctx.addIssue({
        code: "custom",
        message: "Departure date is required",
      });
      return;
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid date",
      });
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      ctx.addIssue({
        code: "custom",
        message: "Departure date cannot be in the past",
      });
    }
  }),
  departureTime: z.any().superRefine((value, ctx) => {
    if (!value) {
      ctx.addIssue({
        code: "custom",
        message: "Departure time is required",
      });
      return;
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid time",
      });
    }
  }),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
