import express from 'express';
import bodyParser from 'body-parser';
import { getProductsList } from './controllers/product/getProductsList.controller';
import { getProductById } from './controllers/product/getProductById.controller';
import { isUserExists } from './middleware/isUserExists';
import { getUserCart } from './controllers/cart/getUserCart.controller';
import { updateUserCart } from './controllers/cart/updateUserCart.controller';
import { deleteUserCart } from './controllers/cart/deleteUserCart.controller';
import { checkoutUserCart } from './controllers/cart/checkoutUserCart.controller';

const app = express();
const productRouter = express.Router();
const cartRouter = express.Router();

app.use(bodyParser.json());

// check userId middleware
cartRouter.use(isUserExists);

cartRouter.get('', getUserCart);
cartRouter.put('', updateUserCart);
cartRouter.delete('', deleteUserCart);
cartRouter.post('/checkout', checkoutUserCart);

productRouter.get('', getProductsList);
productRouter.get('/:productId', getProductById);

app.use('/api/products', productRouter);
app.use('/api/profile/cart', cartRouter);

app.listen(3000, () => {
    console.log('Server is started on port 3000');
})