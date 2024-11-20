import express, { Request, Response } from "express";
import { getAllPictures, likeImage, followImage, tagImage } from "../controllers/PinterestImageController";

const router = express.Router();

// Fetch all pictures
router.get("/pictures", async (req: Request, res: Response) => {
  try {
    await getAllPictures(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while fetching pictures" });
  }
});

// Like a picture
router.post("/pictures/like/:id", async (req: Request, res: Response) => {
  try {
    await likeImage(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while liking the picture" });
  }
});

// Follow or unfollow a picture
router.post("/pictures/follow/:id", async (req: Request, res: Response) => {
  try {
    await followImage(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while following/unfollowing the picture" });
  }
});

// Tag a picture
router.post("/pictures/tag/:id", async (req: Request, res: Response) => {
  try {
    await tagImage(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while tagging the picture" });
  }
});

export default router;
