import mongoose, { Document, Schema } from 'mongoose';

export interface IBudget extends Document {
  userId: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
}

const BudgetSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  limit: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  period: { type: String, enum: ['monthly', 'weekly', 'yearly'], required: true },
});

export default mongoose.model<IBudget>('Budget', BudgetSchema);