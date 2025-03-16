import express from 'express';
import { getUserData } from '../controllers/userCotroller.js'; 
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();


userRouter.get('/data', userAuth, getUserData); 


export default userRouter;
