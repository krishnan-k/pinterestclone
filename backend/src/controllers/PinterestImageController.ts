import { Request, Response } from "express";
import { PinterestImage } from "../middlewareAPI/Middleware";
import PinterestPicture from "../models/PinterestPicture";
export const imageSync = async (_req: Request, res: Response):Promise<any> => {
  try {
    const images = await PinterestImage();
    for (const image of images) {
      const existingPicture = PinterestPicture.findOne({
        pinterestId: image.id,
      });
      if (!existingPicture) {
        await PinterestPicture.create({
          pinterestId: image.id,
          title: image.note,
          imageUrl: image.image.original.url,
        });
      }
    }
    res.status(200).json({ message: "Pinterest images synced" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//Like image
export const likeImage = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;
    const image = await PinterestPicture.findById(id);
    if (!image) return res.status(404).json({ error: "Imaeg not found" });

    image.likes += 1;
    await image.save();
    res.status(200).json(image);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//tag image
export const tagImage = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;
    const { tags } = req.body;

    const image = await PinterestPicture.findById(id);
    if (!image) return res.status(404).json({ error: "image not found" });

    image.tags.push(...tags);
    await image.save();
    res.status(200).json(image);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//follow image & unfollow image
export const followImage = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const image = await PinterestPicture.findById(id);
    if (!image) return res.status(404).json({ error: "image not found" });

    if (!image.followers.includes(userId)) {
      image.followers.push(userId);
    } else {
      image.followers = image.followers.filter((item) => item !== userId);
    }

    await image.save();
    res.status(200).json(image);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
