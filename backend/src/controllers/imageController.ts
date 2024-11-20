import { Request, Response } from "express";
import * as imageService from "../utils/imageService"; // Ensure this path is correct

// POST request to create a new image
export const createImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, imageUrl, description } = req.body;

    if (!title || !imageUrl || !description) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newImage = await imageService.createImage({ title, imageUrl, description });
    res.status(201).json(newImage);
  } catch (error: any) {
    console.error("Error creating image:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET request to fetch all images
export const getAllImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const images = await imageService.getAllImages();
    res.status(200).json(images);
  } catch (error: any) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET request to fetch a single image by ID
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

// PUT request to update an image
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

// DELETE request to delete an image
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
