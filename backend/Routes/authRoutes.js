import express from 'express';

import {Login,
  Register,} from "../Controllers/authController.js"

  const authRouter = express.Router()
// Authentication routes
authRouter.post('/register', Register);
authRouter.post('/login', Login);



export default authRouter;
