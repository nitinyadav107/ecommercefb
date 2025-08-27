import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import addressRouter from './routes/addressRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import { webhookHandler } from './controllers/orderController.js';
import rateLimit from 'express-rate-limit';

//App Config

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1minute
  max: 10, 
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      error: "Too Many Requests",
      message: "Too many requests from this IP. Please try again after 1 minute."
    });
  }
});

const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();
app.post("/api/payment/webhook", express.raw({ type: "application/json" }), webhookHandler);
//middleware
app.use(express.json());
app.use(cors());

//api endpoint

app.use('/api/user' ,limiter,userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter)
app.use('/api/address',addressRouter);

app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

//listen
app.listen(port, () => console.log(`listening on localhost:${port}`))