import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  title: string;
  imageUrl: string;
  likes: number;
  followers: string[];
}

const imageSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    followers: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Image = mongoose.model<IImage>('Image', imageSchema);
export default Image;
