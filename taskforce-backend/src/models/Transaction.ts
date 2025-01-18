import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  userId: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  subcategory?: string;
  account: string;
  date: Date;
  description: string;
}

const TransactionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  account: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);