import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(100).optional().or(z.literal("")),
  budget: z.string().max(50).optional().or(z.literal("")),
  timeline: z.string().max(50).optional().or(z.literal("")),
  projectType: z.string().max(50).optional().or(z.literal("")),
  message: z.string().min(10, "Please add a few more details").max(3000),
  company_website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const reviewSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  company: z.string().max(100).optional().or(z.literal("")),
  rating: z.number().min(1).max(5),
  message: z.string().min(10, "Please share a bit more detail").max(1500),
  photoUrl: z.string().url().optional().or(z.literal("")),
  company_website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
