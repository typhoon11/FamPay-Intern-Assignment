import mongoose, { Schema, Document } from 'mongoose';

export interface Video extends Document {
  title: string;
  description: string;
  publishingDatetime: Date;
  thumbnails: string[];
}

const VideoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  publishingDatetime: { type: Date, required: true },
  thumbnails: { type: [String], required: true },
});

export const VideoModel = mongoose.model<Video>('Video', VideoSchema);
