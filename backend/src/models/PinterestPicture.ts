import mongoose, { Document, Schema } from "mongoose";

export interface IPicture extends Document {
  pinterestId: string;
  title: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  followers: string[];
}
const ImageSchema: Schema = new Schema({
  pinterestId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  tags: { type: [String], default: [] },
  likes: { type: Number, default: 0 },
  followers: { type: [String], default: [] },
});

export default mongoose.model<IPicture>("PinterestPicture", ImageSchema);
