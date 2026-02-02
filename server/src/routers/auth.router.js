import { Router } from 'express';
import { signin, signup } from '../controllers/auth.controller';
import { signinValidation, signupValidation } from '../validations/auth.validation';
import { validateRequest } from '../middlewares/validateRequest';

const authRouter = Router();
authRouter.post('/signup',validateRequest(signupValidation),signup)
authRouter.post('/signin', validateRequest(signinValidation) ,signin)


export default authRouter;