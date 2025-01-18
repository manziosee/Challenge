import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  userId: string;
  name: string;
  subcategories: string[];
}

const CategorySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  subcategories: { type: [String], required: true },
});

export default mongoose.model<ICategory>('Category', CategorySchema);