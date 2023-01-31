import express from 'express';
import * as commentController from '../controllers/comments.js';
export const router = express.Router();


router.get('/comments', commentController.getAllComments);
router.get('/comments/:parentid', commentController.getSelectedComments);
router.post('/comments', commentController.addComment);