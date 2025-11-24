// zod validation schema file
import z from "zod";

export const userSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(6, "email must be at least 6 characters long")
    .toLowerCase(),
  password: z.string().min(6, "password must be at least 6 characters long"),
});

export const registerSchema = userSchema.extend({
  firstName: z.string().min(2, "first name must be at least 2 characters long"),
  lastName: z.string().min(2, "last name must be at least 2 characters long"),
});
