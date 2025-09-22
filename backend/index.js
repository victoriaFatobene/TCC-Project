// Código para o servidor Express

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors'); 

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Exemplo de rota para criar um novo status
app.post('/status', async (req, res) => {
  const { name } = req.body;
  try {
    const newStatus = await prisma.status.create({
      data: { name },
    });
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o status' });
  }
});

//rota do Usuário
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o usuário' });
  }
});

//rota da categoria
app.post('/categories', async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a categoria' });
  }
});

//rota de produto
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
    res.status(500).json({ error: 'Erro ao criar o produto' }); 
  }
});

// rota do pedido
app.post('/orders', async (req, res) => {
  const { table, name, statusId, items } = req.body;
  try {
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
    res.status(500).json({ error: 'Erro ao criar o pedido' });
  }
});

//rota do item
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
    res.status(500).json({ error: 'Erro ao adicionar o item' });
  }
});

//Rota do MenuItem
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
    res.status(500).json({ error: 'Erro ao criar o item de cardápio' });
  }
});

//Rota do ItemModification
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
    res.status(500).json({ error: 'Erro ao criar a modificação de item' }); 
  }
});

//Rota do ProductIngredient
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
    res.status(500).json({ error: 'Erro ao criar a relação produto-ingrediente' });
  }
});

//Rota da CategoryView
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
    res.status(500).json({ error: 'Erro ao registrar a visualização da categoria' });
  }
});

//Rota do ingrediente
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
    res.status(500).json({ error: 'Erro ao criar o ingrediente' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});