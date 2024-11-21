import { Request, Response } from "express";
import * as imageService from "../view/imageService"; 

// image post
export const createImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, imageUrl, description, tags } = req.body;

    if (!title || !imageUrl || !description || !tags) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newImage = await imageService.createImage({ title, imageUrl, description, tags });
    res.status(201).json(newImage);
  } catch (error: any) {
    console.error("Error creating image:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// get all image
export const getAllImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tag } = req.query; 
    let images;

    if (tag) {
      images = await imageService.getAllImagesByTag(tag.toString());
    } else {
      images = await imageService.getAllImages();
    }

    res.status(200).json(images);
  } catch (error: any) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: error.message });
  }
};

// get unique image
export const getImageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const image = await imageService.getImageById(id);

    if (!image) {
      res.status(404).json({ message: "Image not found" });
      return;
    }

    res.status(200).json(image);
  } catch (error: any) {
    console.error("Error fetching image by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// update image
export const updateImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedImage = await imageService.updateImage(id, req.body);

    if (!updatedImage) {
      res.status(404).json({ message: "Image not found" });
      return;
    }

    res.status(200).json(updatedImage);
  } catch (error: any) {
    console.error("Error updating image:", error);
    res.status(500).json({ message: error.message });
  }
};

// delete image
export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await imageService.deleteImage(id);

    if (!deleted) {
      res.status(404).json({ message: "Image not found" });
      return;
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: error.message });
  }
};


//add tag
export const addTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { tag } = req.body;

  try {
    const updatedImage = await imageService.addTagToImage(id, tag);
    res.status(200).json(updatedImage);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// get tag
export const getTags = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tags = await imageService.getTagsForImage(id);
    res.status(200).json(tags);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



