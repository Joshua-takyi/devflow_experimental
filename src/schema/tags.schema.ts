import z from "zod";

export const tagSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z ]+$/, "tag name can only contain letters and spaces")
    .max(100, "tag name can't be longer than 100 letters")
    .transform((value: string) => value.trim()),
});

export type TagInput = z.infer<typeof tagSchema>;
