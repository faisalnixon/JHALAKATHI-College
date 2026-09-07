import type { Request, Response } from "express";
import { Readable } from "node:stream";

import {
  getFacebookGallery,
  getNoticesByHashtag,
  findNoticePhotoById,
} from "../lib/facebook";

/* -------------------------------------------------------------------------- */
/*                              ALBUMS / GALLERY                              */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                          NOTICES BY HASHTAG                                */
/* -------------------------------------------------------------------------- */

export async function getNoticesByHashtagHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const hashtag =
      typeof req.params.hashtag === "string"
        ? req.params.hashtag.trim()
        : "";

    if (!hashtag) {
      res.status(400).json({
        error: "Hashtag is required",
      });

      return;
    }

    const posts = await getNoticesByHashtag(hashtag);

    res.status(200).json({
      hashtag,
      posts,
    });
  } catch (error) {
    console.error(
      "Failed to load hashtag notices:",
      error
    );

    res.status(500).json({
      error: "Failed to load notices",
    });
  }
}

/* -------------------------------------------------------------------------- */
/*                              PHOTO DOWNLOAD                                */
/* -------------------------------------------------------------------------- */

export async function downloadNoticePhoto(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const photoId =
      typeof req.params.photoId === "string"
        ? req.params.photoId.trim()
        : "";

    if (!photoId) {
      res.status(400).json({
        error: "Photo ID is required",
      });

      return;
    }

    const photo = await findNoticePhotoById(photoId);

    if (!photo) {
      res.status(404).json({
        error: "Photo not found",
      });

      return;
    }

    // Proxy the download through our own server rather than sending the
    // raw Facebook CDN URL to the client, so the browser's "Save As"
    // filename and content-disposition are under our control.
    const upstream = await fetch(photo.url);

    if (!upstream.ok || !upstream.body) {
      res.status(502).json({
        error: "Failed to fetch photo from Facebook",
      });

      return;
    }

    const contentType =
      upstream.headers.get("content-type") ??
      "image/jpeg";

    const extension =
      contentType.split("/")[1]?.split(";")[0] ?? "jpg";

    res.setHeader("Content-Type", contentType);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="jhalakathi-college-${photo.id}.${extension}"`
    );

    Readable.fromWeb(
      // @ts-expect-error -- undici's ReadableStream vs Node's web-streams
      // type both satisfy the runtime contract Readable.fromWeb expects.
      upstream.body
    ).pipe(res);
  } catch (error) {
    console.error(
      "Failed to download photo:",
      error
    );

    res.status(500).json({
      error: "Failed to download photo",
    });
  }
}















// import type { Request, Response } from "express";
// import { getFacebookGallery } from "../lib/facebook";

// export async function getGallery(
//   _req: Request,
//   res: Response
// ): Promise<void> {
//   try {
//     const gallery = await getFacebookGallery();

//     res.status(200).json(gallery);
//   } catch (error) {
//     console.error(
//       "Failed to load Facebook gallery:",
//       error
//     );

//     res.status(500).json({
//       error: "Failed to load gallery",
//     });
//   }
// }