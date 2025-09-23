import { Review } from '../../models/reviewModels'; 

export const createReview = async (
  userId: string,
  rating: number,
  comment?: string
) => {
  const review = new Review({ userId, rating, comment });
  return await review.save();
};

export const getReviews = async () => {
  return await Review.find().sort({ createdAt: -1 });
};
