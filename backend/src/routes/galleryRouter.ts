import { Router } from "express";

import {
  getGallery,
  getNoticesByHashtagHandler,
  downloadNoticePhoto,
} from "../controllers/galleryController";

const router = Router();

// Album-based photo gallery (/gallery page)
router.get("/", getGallery);

// Notices grouped by hashtag (#hsc, #degree, #honours&masters, #officials,
// #examNotice, #general, and any other tag used in a post's message)
router.get("/hashtag/:hashtag", getNoticesByHashtagHandler);

// Proxy download for a single notice photo, by its Facebook photo id
router.get("/photo/:photoId/download", downloadNoticePhoto);

export default router;








// import { Router } from "express";
// import { getGallery } from "../controllers/galleryController";

// const router = Router();

// router.get("/", getGallery);

// export default router;