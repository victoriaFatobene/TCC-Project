import { Request, Response } from 'express';
import * as reviewService from '../../services/user/ReviewService';

export const addReview = async (req: Request, res: Response) => {
  try {
    const { userId, orderId, rating, comment } = req.body;

    if (!userId || !orderId || rating === undefined) {
      return res.status(400).json({ message: 'Usuário, pedido e nota são obrigatórios' });
    }

    const review = await reviewService.createReview(userId, orderId, rating, comment);
    return res.status(201).json(review);
  } catch (error: any) {
    console.error('Erro no addReview:', error);
    return res.status(500).json({ message: 'Erro ao salvar avaliação', error: error.message });
  }
};

export const listReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await reviewService.getReviews();
    return res.status(200).json(reviews);
  } catch (error: any) {
    console.error('Erro no listReviews:', error);
    return res.status(500).json({ message: 'Erro ao listar avaliações', error: error.message });
  }
};
