import { Schema, model, Document } from 'mongoose';

interface IReview extends Document {
  userId: string;       // quem avaliou
  rating: number;       // nota (ex: 1 a 5)
  comment?: string;     // comentário opcional
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  userId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Review = model<IReview>('Review', reviewSchema);
