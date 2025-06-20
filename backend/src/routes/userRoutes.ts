import express from 'express';
import { getUser } from '../controllers/userController';

const router = express.Router();
router.get('/:address', getUser);

export default router;
