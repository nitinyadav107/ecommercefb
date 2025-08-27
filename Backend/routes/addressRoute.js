import express from 'express'
import { addAddress, getAddress, removeAddress } from '../controllers/addressController.js'
import authUser from '../middleware/auth.js';
const addressRouter = express.Router();
addressRouter.post('/add',authUser, addAddress);
addressRouter.get('/get',authUser, getAddress);
addressRouter.post('/remove',authUser, removeAddress);

export default addressRouter;