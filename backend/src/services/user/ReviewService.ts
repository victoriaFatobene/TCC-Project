import prismaClient from '../../prisma';

export const createReview = async (
  clientId: string,
  orderId: string,
  rating: number,
  comment?: string
) => {
  try {
    // verifica se o cliente existe
    const clientExists = await prismaClient.client.findUnique({
      where: { id: clientId },
    });
    if (!clientExists) {
      throw new Error('Cliente não existe');
    }

    // verifica se o pedido existe
    const orderExists = await prismaClient.order.findUnique({
      where: { id: orderId },
    });
    if (!orderExists) {
      throw new Error('Pedido não existe');
    }

    // cria o review
    const review = await prismaClient.review.create({
      data: {
        clientId,
        orderId,
        rating,
        comment: comment ?? null,
        createAt: new Date(),
      },
    });

    return review;
  } catch (error) {
    console.error('Erro ao criar review:', error);
    throw new Error('Falha ao salvar avaliação no banco');
  }
};

export const getReviews = async () => {
  try {
    const reviews = await prismaClient.review.findMany({
      orderBy: { createAt: 'desc' },
    });
    return reviews;
  } catch (error) {
    console.error('Erro ao listar reviews:', error);
    throw new Error('Falha ao listar avaliações');
  }
};
