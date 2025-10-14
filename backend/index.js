// Arquivo: seu-servidor.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
 
const prisma = new PrismaClient();
const app = express();
 
app.use(express.json());
app.use(cors());
 
// Rota para criar um novo Status
app.post('/status', async (req, res) => {
  const { name } = req.body;
  try {
    const newStatus = await prisma.status.create({
      data: { name },
    });
    res.status(201).json(newStatus);
  } catch (error) {
    console.error("Erro ao criar o status:", error); // Log para depuração
    res.status(500).json({ error: 'Erro ao criar o status' });
  }
});
 
// Rota para criar um novo Usuário
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar o usuário:", error);
    res.status(500).json({ error: 'Erro ao criar o usuário' });
  }
});
 
// Rota para criar uma nova Categoria
app.post('/categories', async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Erro ao criar a categoria:", error);
    res.status(500).json({ error: 'Erro ao criar a categoria' });
  }
});
 
// Rota para criar um novo Produto
app.post('/products', async (req, res) => {
  const { name, price, description, imageUrl, categoryId } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        description,
        imageUrl,
        categoryId,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erro ao criar o produto:", error);
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
});
 
// Rota para criar um novo Pedido com seus Itens
app.post('/orders', async (req, res) => {
  const { table, name, statusId, items } = req.body;
  try {
    // CORREÇÃO: A cláusula 'include' deve estar no mesmo nível de 'data'
    const newOrder = await prisma.order.create({
      data: {
        table,
        name,
        statusId,
        items: {
          create: items.map(item => ({
            amount: item.amount,
            productId: item.productId,
          })),
        },
      },
      include: {
        items: true, 
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Erro ao criar o pedido:", error);
    res.status(500).json({ error: 'Erro ao criar o pedido' });
  }
});
 
// Rota para criar um novo Item (individualmente)
app.post('/items', async (req, res) => {
  const { orderId, amount, productId } = req.body;
  try {
    const newItem = await prisma.item.create({
      data: {
        orderId,
        amount,
        productId,
      },
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Erro ao adicionar o item:", error);
    res.status(500).json({ error: 'Erro ao adicionar o item' });
  }
});
 
// Rota para criar um novo Item de Cardápio
app.post('/menu-items', async (req, res) => {
  const { name, imageUrl, description, price, categoryId } = req.body;
  try {
    const newMenuItem = await prisma.menuItem.create({
      data: {
        name,
        imageUrl,
        description,
        price,
        categoryId,
      },
    });
    res.status(201).json(newMenuItem);
  } catch (error) {
    console.error("Erro ao criar o item de cardápio:", error);
    res.status(500).json({ error: 'Erro ao criar o item de cardápio' });
  }
});
 
// Rota para criar uma nova Modificação de Item
app.post('/item-modifications', async (req, res) => {
  const { type, itemId, ingredientId } = req.body;
  try {
    const newItemModification = await prisma.itemModification.create({
      data: {
        type,
        itemId,
        ingredientId,
      },
    });
    res.status(201).json(newItemModification);
  } catch (error) {
    console.error("Erro ao criar a modificação de item:", error);

    res.status(500).json({ error: 'Erro ao criar a modificação de item' });
  }
});
 
// Rota para criar uma nova Relação Produto-Ingrediente
app.post('/product-ingredients', async (req, res) => {
  const { productId, ingredientId } = req.body;
  try {
    const newProductIngredient = await prisma.productIngredient.create({
      data: {
        productId,
        ingredientId,
      },
    });

    res.status(201).json(newProductIngredient);
  } catch (error) {
    console.error("Erro ao criar a relação produto-ingrediente:", error);
    res.status(500).json({ error: 'Erro ao criar a relação produto-ingrediente' });
  }
});
 
// Rota para registrar uma Visualização de Categoria
app.post('/category-view', async (req, res) => {
  const { userId, categoryId } = req.body;
  try {

    const newCategoryView = await prisma.categoryView.create({
      data: {
        userId,
        categoryId,
      },
    });
    res.status(201).json(newCategoryView);
  } catch (error) {
    console.error("Erro ao registrar a visualização da categoria:", error);
    res.status(500).json({ error: 'Erro ao registrar a visualização da categoria' });
  }
});
 
// Rota para criar um novo Ingrediente
app.post('/ingredients', async (req, res) => {
  const { name, price } = req.body;
  try {
    const newIngredient = await prisma.ingredient.create({
      data: {
        name,
        price,
      },
    });
    res.status(201).json(newIngredient);
  } catch (error) {
    console.error("Erro ao criar o ingrediente:", error);
    res.status(500).json({ error: 'Erro ao criar o ingrediente' });
  }
});
 

// Rota para registrar um Pagamento
app.post('/api/payments', async (req, res) => {
  const { orderId, amount, paymentType } = req.body;
  
  const initialStatusName = 'Na fila';
  // ['Na fila', 'Em preparo' , 'Pronto!'];

  try{
    const initialStatus = await prisma.status.findUnique({
      where:{name: initialStatusName},
      select:{id:true}
    });
    if(!initialStatus){
      return res.status(500).json({error: `O Status inicial ${initialStatusName} não foi encontrado no banco de dados.`});
    }

    const newPayment = await prisma.payment.create({
      data:{
        orderId,
        amount,
        paymentType,
        statusId: initialStatus.id,
      }
    });

    res.status(201).json(newPayment);
  }catch(error){
    console.error("Falha ao processar o pagamento:", error);
    res.status(500).json({error: 'Falha ao processar o pagamento.'});
  }
});

 
// Rota para criar uma nova Avaliação (Review)
app.post('/api/reviews', async (req, res) => {
  const { userId, productId, rating, comment } = req.body;
  try {
    if (!userId || !productId || !rating) {

      return res.status(400).json({ error: 'Campos obrigatórios pendentes: userId, productId e rating' });
    }
    const newReview = await prisma.review.create({
      data: {
        userId: parseInt(userId),
        productId: parseInt(productId),
        rating: parseInt(rating),
        comment: comment || '',
      }
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    res.status(500).json({ error: 'Erro ao criar a avaliação' });
  }
});