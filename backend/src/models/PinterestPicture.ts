import mongoose, { Schema, Document } from "mongoose";

interface PinterestPicture extends Document {
  pinterestId: number;
  imageUrl: string;
  likes: number;
  followers: string[];
  tags: string[];
}

const PinterestPictureSchema = new Schema<PinterestPicture>({
  pinterestId: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  followers: { type: [String], default: [] },
  tags: { type: [String], default: [] },
});

export default mongoose.model<PinterestPicture>("PinterestPicture", PinterestPictureSchema);
