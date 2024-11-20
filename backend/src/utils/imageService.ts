import Image, { IImage } from '../models/ImageModel';

// Create an image
export const createImage = async (imageData: { title: string, description: string, imageUrl: string }) => {
  try {
    const newImage = new Image({
      ...imageData,
      likes: 0,
      followers: [],
    });
    await newImage.save();
    return newImage;
  } catch (error) {
    console.error('Error saving image to DB', error);
    throw error;
  }
};

// Get all images
export const getAllImages = async (): Promise<IImage[]> => {
  return await Image.find();
};

// Get an image by ID
export const getImageById = async (id: string): Promise<IImage | null> => {
  return await Image.findById(id);
};

// Update an image
export const updateImage = async (id: string, updateData: Partial<IImage>) => {
  return await Image.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete an image
export const deleteImage = async (id: string): Promise<IImage | null> => {
  return await Image.findByIdAndDelete(id);
};
