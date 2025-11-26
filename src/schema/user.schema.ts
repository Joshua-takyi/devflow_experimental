// zod validation schema file
import z from "zod";

export const registerSchema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "Email is required")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const userProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be at most 50 characters")
    .regex(/^[a-zA-Z ]+$/, "First name must contain only letters and spaces")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be at most 50 characters")
    .regex(/^[a-zA-Z ]+$/, "Last name must contain only letters and spaces")
    .trim(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]\d{0,15}$/, "Invalid phone number format")
    .optional(),
  bio: z
    .string()
    .trim()
    .max(500, "Bio must be at most 500 characters")
    .regex(
      /^[a-zA-Z0-9 .,!?'"-]+$/,
      "Bio can only contain letters, numbers, spaces, and common punctuation"
    )
    .optional(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;

export const updatePasswordSchema = registerSchema.pick({ password: true });
