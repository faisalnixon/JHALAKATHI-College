import type { Request, Response } from "express";
import { getFacebookGallery } from "../lib/facebook";

export async function getGallery(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const gallery = await getFacebookGallery();

    res.status(200).json(gallery);
  } catch (error) {
    console.error(
      "Failed to load Facebook gallery:",
      error
    );

    res.status(500).json({
      error: "Failed to load gallery",
    });
  }
}