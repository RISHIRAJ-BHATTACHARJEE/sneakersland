import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  address: z.string().optional(),
  phone: z.number().optional(),
});
