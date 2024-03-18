import { z } from "zod";

export const eventFormSchema = z.object({
    price: z.string(),
    isFree: z.boolean(),
    imageUrl: z.string(),
    url: z.string().url(),
    endDateTime: z.date(),
    categoryId: z.string(),
    startDateTime: z.date(),
    title: z.string().min(3, "Title must be at least 3 characters."),
    description: z
        .string()
        .min(3, "Description must be at least 3 characters.")
        .max(1500, "Description must be at most 1500 characters."),
    location: z
        .string()
        .min(3, "Location must be at least 3 characters.")
        .max(400, "Location must be at most 400 characters."),
});
