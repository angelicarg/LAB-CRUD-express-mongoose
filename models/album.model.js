import { Schema, model } from 'mongoose';

const albumSchema = new Schema(
  {
    performer: { type: String },
    title: { type: String },
    cost: { type: Number },
  },
  { timestamps: true }
);

const AlbumModel = model('Album', albumSchema);

export default AlbumModel;
