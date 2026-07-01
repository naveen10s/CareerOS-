import { z } from "zod";

export const ProfileSchema = z.object({
  personal: z.object({
    name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
    location: z.string(),
  }),
  career: z.object({
    headline: z.string(),
    targetRoles: z.array(z.string()),
    currentRole: z.string(),
  }),
  vision: z.object({
    statement: z.string(),
    transitionFocus: z.string(),
  }),
  goals: z.array(z.string()),
  links: z.object({
    linkedin: z.string().url(),
    github: z.string().url(),
    portfolio: z.string().url(),
  }),
  brand: z.object({
    themeColor: z.string(),
    tagline: z.string(),
  }),
});
