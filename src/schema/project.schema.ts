import z from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(100, "title can't be longer than 100 letters")
    .regex(/^[a-zA-Z ]+$/, "title can only contain letters and spaces"),
  summary: z
    .string()
    .min(3)
    .max(1000, "summary can't be longer than 1000 letters")
    .transform((value) => value.trim()),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  content: z
    .string()
    .min(3)
    .max(1000, "content can't be longer than 1000 letters")
    .transform((value) => value.trim()),
  requirements: z.array(
    z
      .string()
      .min(3)
      .max(100, "requirement can't be longer than 100 letters")
      .transform((value) => value.trim())
  ),
  coverImage: z.string().optional(),
  projectSteps: z.array(
    z.object({
      title: z
        .string()
        .min(3)
        .max(100)
        .regex(/^[a-zA-Z ]+$/, "title can only contain letters and spaces"),
      content: z.string().optional(),
      order: z.number().optional(),
      images: z.array(z.string()).optional(),
    })
  ),
  tagName: z.array(
    z
      .string()
      .min(2, "tag name must be at least 2 characters")
      .max(50, "tag name can't be longer than 50 letters")
      .transform((value) => value.trim())
  ),
});

export type ProjectInput = z.infer<typeof projectSchema>;
