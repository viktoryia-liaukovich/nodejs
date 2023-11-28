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
import mongoose, { connect } from 'mongoose';
import { registerUser } from './controllers/api/registerUser.controller';
import { loginUser } from './controllers/api/loginUser.controller';
import { isAdmin } from './middleware/isAdmin';
import morgan from 'morgan';
import { Log } from './utils/logger';

dotenv.config();

const app = express();
const productRouter = express.Router();
const cartRouter = express.Router();
const apiRouter = express.Router();

connect('mongodb://mongoadmin:bdung@127.0.0.1:27017');

app.use(morgan((tokens, req, res) => `${tokens.method(req, res)} ${Number(tokens.status(req, res))} ${tokens.url(req, res)} :: ${Number.parseFloat(tokens['response-time'](req, res)!)}ms`));
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
apiRouter.post('/health', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.status(200).send("OK");
    } else {
        res.status(500).send("Connection to database is not active");
    }
});

app.use('/api', apiRouter);
app.use('/api/products', productRouter);
app.use('/api/profile/cart', cartRouter);

const server = app.listen(3000, () => {
    Log('Server is started on port 3000');
});

const shutdownGracefully = () => {
    Log('Closing http server.');
    server.close(() => {
        Log('Http server closed.');
        // boolean means [force], see in mongoose doc
        mongoose.connection.close(false).then(() => {
            Log('MongoDb connection closed.');
            process.exit(0);
        });
    });
}

process.on('SIGTERM', () => {
    Log('SIGTERM signal received.');
    shutdownGracefully();
});

process.on('SIGINT', () => {
    Log('SIGINT signal received.');
    shutdownGracefully();
});