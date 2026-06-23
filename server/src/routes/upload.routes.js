import express from 'express';
import { deleteAsset, generateUploadSignature } from '../controllers/upload.controller.js';
const router = express.Router();

router.post('/signature', generateUploadSignature);
router.delete('/:publicId', deleteAsset);

export default router;