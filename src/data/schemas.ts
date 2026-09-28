import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  email: z.string().email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),

  address: z.string().min(5, "Address must be at least 5 characters"),

  city: z.string().min(2, "City must be at least 2 characters"),
});

export const paymentSchema = z.object({
  cardName: z
    .string()
    .min(2, "Cardholder name is required")
    .max(100, "Name is too long"),

  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Invalid card number")
    .regex(/^[\d\s]+$/, "Card number can only contain numbers"),

  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),

  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});
