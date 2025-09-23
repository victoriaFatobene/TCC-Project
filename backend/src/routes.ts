// src/routes.ts
import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';

import uploadConfig from './config/multer';

// USERS
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

// CATEGORY
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

// PRODUCT
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

// ORDER
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

// MENU
import { ListMenuController } from './controllers/menu/ListMenuController';

// PAYMENT
import { processPayment } from './controllers/payment/PaymentController';

// REVIEWS
import { addReview, listReviews } from './controllers/user/ReviewController';
import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();
const upload = multer(uploadConfig.upload('./tmp'));

const reviewRouter = Router(); // rota especifica para reviews

// helper simples pra encadear async/await sem erro de tipo
const h = (fn: (req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/** Healthcheck */
router.get('/ping', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

/** Users */
router.post('/users', h((req, res) => new CreateUserController().handle(req, res)));
router.post('/session', h((req, res) => new AuthUserController().handle(req, res)));
router.get('/me', h((req, res) => new DetailUserController().handle(req, res)));

/** Category */
router.post('/category', h((req, res) => new CreateCategoryController().handle(req, res)));
router.get('/category', h((req, res) => new ListCategoryController().handle(req, res)));

/** Product */
router.post('/product', upload.single('file'), h((req, res) => new CreateProductController().handle(req, res)));
router.get('/category/product', h((req, res) => new ListByCategoryController().handle(req, res)));

/** Orders */
router.post('/order', h((req, res) => new CreateOrderController().handle(req, res)));
router.delete('/order', h((req, res) => new RemoveOrderController().handle(req, res)));
router.post('/order/add', h((req, res) => new AddItemController().handle(req, res)));
router.delete('/order/remove', h((req, res) => new RemoveItemController().handle(req, res)));
router.put('/order/send', h((req, res) => new SendOrderController().handle(req, res)));
router.get('/orders', h((req, res) => new ListOrdersController().handle(req, res)));
router.get('/order/detail', h((req, res) => new DetailOrderController().handle(req, res)));
router.put('/order/finish', h((req, res) => new FinishOrderController().handle(req, res)));

/** Menu (cardápio) */
router.get('/menu', h((req, res) => new ListMenuController().handle(req, res)));

/** Payment */
router.post('/payment', isAuthenticated, (req, res, next) => {
  processPayment(req, res).catch(next);
});

/** Reviews */
reviewRouter.post('/', isAuthenticated, h(addReview));
reviewRouter.get('/', isAuthenticated, h(listReviews));

// todas as rotas de review começam com /reviews
router.use('/reviews', reviewRouter);

export { router };