import { z } from "zod";

export const appKeySchema = z.enum(["remix", "svelte"]);
export type AppKey = z.infer<typeof appKeySchema>;

export const stackChoiceStatusSchema = z.enum(["fixed", "experiment", "alternative", "deferred"]);
export type StackChoiceStatus = z.infer<typeof stackChoiceStatusSchema>;

export const helloContentSchema = z.object({
  id: z.string(),
  appKey: appKeySchema,
  headline: z.string().min(1),
  body: z.string().nullable(),
  published: z.boolean(),
  updatedAt: z.iso.datetime(),
});
export type HelloContent = z.infer<typeof helloContentSchema>;

export const stackChoiceSchema = z.object({
  id: z.string(),
  category: z.string().min(1),
  subcategory: z.string().nullable(),
  choice: z.string().min(1),
  role: z.string().min(1),
  status: stackChoiceStatusSchema,
  notes: z.string().nullable(),
  sortOrder: z.number().int(),
  updatedAt: z.iso.datetime(),
});
export type StackChoice = z.infer<typeof stackChoiceSchema>;

export const userSummarySchema = z.object({
  id: z.string(),
  email: z.email(),
  displayName: z.string().nullable(),
  avatarUrl: z.url().nullable(),
});
export type UserSummary = z.infer<typeof userSummarySchema>;

export const sessionSummarySchema = z.object({
  user: userSummarySchema,
  expiresAt: z.iso.datetime(),
});
export type SessionSummary = z.infer<typeof sessionSummarySchema>;

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string().min(1),
    message: z.string().min(1),
    requestId: z.string().min(1),
  }),
});
export type ApiError = z.infer<typeof apiErrorSchema>;

export const createApiError = (code: string, message: string, requestId: string): ApiError => ({
  error: {
    code,
    message,
    requestId,
  },
});
