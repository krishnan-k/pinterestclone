import { Router } from "express"
import { followImage, imageSync, likeImage, tagImage } from "../controllers/PinterestImageController";

const router = Router();

router.post('/imagesync', imageSync);
router.post('/:id/likeimage', likeImage);
router.post('/:id/imagetag', tagImage);
router.post('/:id/imagefollow', followImage);

export default router;