import { z } from "zod";

export const AssetSchema = z.object({
  id: z.string(),
  path: z.string(),
  alt: z.string(),
  type: z.enum(["image", "video", "document"]),
});

export const AssetsSchema = z.array(AssetSchema);
