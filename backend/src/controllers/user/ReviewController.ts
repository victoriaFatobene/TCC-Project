import { Request, Response } from 'express';
import * as reviewService from '../../services/user/ReviewService';

export const addReview = async (req: Request, res: Response) => {
  try {
    const { userId, rating, comment } = req.body;
    if (!userId || !rating) {
      return res.status(400).json({ message: 'Usuário e nota são obrigatórios' });
    }

    const review = await reviewService.createReview(userId, rating, comment);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar avaliação', error });
  }
};

export const listReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await reviewService.getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar avaliações', error });
  }
};
