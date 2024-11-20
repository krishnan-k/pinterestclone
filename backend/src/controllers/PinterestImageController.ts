import { Request, Response } from "express";
import PinterestPicture from "../models/PinterestPicture";

// Fetch all pictures from the database
export const getAllPictures = async (req: Request, res: Response): Promise<Response> => {
  try {
    const pictures = await PinterestPicture.find();
    if (!pictures.length) {
      return res.status(404).json({ error: "No images found." });
    }
    return res.status(200).json(pictures);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Failed to fetch images." });
  }
};

// Like an image
export const likeImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const picture = await PinterestPicture.findById(id);

    if (!picture) {
      return res.status(404).json({ error: "Image not found" });
    }

    picture.likes += 1;
    await picture.save();
    return res.status(200).json(picture);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Failed to like image" });
  }
};

// Tag an image
export const tagImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { tags } = req.body;

    const picture = await PinterestPicture.findById(id);
    if (!picture) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Add tags if they are unique
    picture.tags = [...new Set([...picture.tags, ...tags])];
    await picture.save();
    return res.status(200).json(picture);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Failed to tag image" });
  }
};

// Follow or Unfollow an image
export const followImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const picture = await PinterestPicture.findById(id);
    if (!picture) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Add or remove the user from the followers list
    if (!picture.followers.includes(userId)) {
      picture.followers.push(userId);
    } else {
      picture.followers = picture.followers.filter((follower) => follower !== userId);
    }

    await picture.save();
    return res.status(200).json(picture);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Failed to follow/unfollow image" });
  }
};
