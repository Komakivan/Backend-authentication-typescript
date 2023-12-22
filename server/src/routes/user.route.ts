import express from 'express';
import { validateResourse } from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { createUserHandler } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/api/users', validateResourse(createUserSchema), createUserHandler)

export { userRouter };