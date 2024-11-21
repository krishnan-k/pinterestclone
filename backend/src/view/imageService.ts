import Image, { IImage } from '../models/ImageModel';

// Create an image
export const createImage = async (imageData: { title: string, description: string, imageUrl: string, tags: string[] }) => {
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



// tag post
export const addTagToImage = async (id: string, tag: string): Promise<IImage | null> => {
  try {
    const image = await Image.findById(id);
    if (!image) {
      throw new Error("Image not found");
    }
    if (!image.tags.includes(tag)) {
      image.tags.push(tag);
      await image.save();
    }
    return image;
  } catch (error) {
    console.error("Error adding tag to image:", error);
    throw error;
  }
};

// get tag
export const getTagsForImage = async (id: string): Promise<string[]> => {
  try {
    const image = await Image.findById(id);
    if (!image) {
      throw new Error("Image not found");
    }
    return image.tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};



export const getAllImagesByTag = async (tag: string): Promise<IImage[]> => {
  try {
    const images = await Image.find({ tags: { $in: [tag] } });
    return images;
  } catch (error) {
    console.error("Error fetching images by tag:", error);
    throw error;
  }
};