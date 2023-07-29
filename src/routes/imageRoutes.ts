// imageRoutes.ts
import express from 'express';
import { uploadImage, getImageHash } from '../controllers/imageController';

const router = express.Router();

router.post('/upload', uploadImage);
router.get('/hash/:fileName', getImageHash);

export { router as imageRoutes };
