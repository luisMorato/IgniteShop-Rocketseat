import { z } from "zod";

const envSchema = z.object({
    NEXT_URL: z.string().url(),
    STRIPE_PUBLIC_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
