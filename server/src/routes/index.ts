import express from 'express';
import { authRouter } from './auth.route';
import { userRouter } from './user.route';

const router = express.Router();

router.get('/health-check/', (_, res) => res.sendStatus(200));
router.use(authRouter)
router.use(userRouter)

export { router }