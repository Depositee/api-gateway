import {Router} from 'express';
import {
   getReviewByDepositeeId,
   createReview,
   updateReview,
   deleteReview
} from '../controllers/review.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/depositee/:depositeeId', getReviewByDepositeeId);
router.post('/',authMiddleware, createReview);
router.put('/:id',authMiddleware, updateReview);
router.delete('/:id',authMiddleware, deleteReview);

export default router;
