import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { getProductsList } from './controllers/product/getProductsList.controller';
import { getProductById } from './controllers/product/getProductById.controller';
import { isTokenValid } from './middleware/isTokenValid';
import { getUserCart } from './controllers/cart/getUserCart.controller';
import { updateUserCart } from './controllers/cart/updateUserCart.controller';
import { deleteUserCart } from './controllers/cart/deleteUserCart.controller';
import { checkoutUserCart } from './controllers/cart/checkoutUserCart.controller';
import { connect } from 'mongoose';
import { registerUser } from './controllers/api/registerUser.controller';
import { loginUser } from './controllers/api/loginUser.controller';
import { isAdmin } from './middleware/isAdmin';

dotenv.config();

const app = express();
const productRouter = express.Router();
const cartRouter = express.Router();
const apiRouter = express.Router();

connect('mongodb://mongoadmin:bdung@127.0.0.1:27017');

app.use(bodyParser.json());

// check token middleware
cartRouter.use(isTokenValid);

cartRouter.get('', getUserCart);
cartRouter.put('', updateUserCart);
cartRouter.delete('', isAdmin, deleteUserCart);
cartRouter.post('/checkout', checkoutUserCart);

// check token middleware
productRouter.use(isTokenValid);
productRouter.get('', getProductsList);
productRouter.get('/:productId', getProductById);

apiRouter.post('/register', registerUser);
apiRouter.post('/login', loginUser);

app.use('/api', apiRouter);
app.use('/api/products', productRouter);
app.use('/api/profile/cart', cartRouter);

app.listen(3000, () => {
    console.log('Server is started on port 3000');
})