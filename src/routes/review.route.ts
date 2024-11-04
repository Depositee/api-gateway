import {Router} from 'express';
import {
   getReviewByDepositeeId,
   createReview,
   updateReview,
   deleteReview
} from '../controllers/review.controller';

const router = Router();

router.get('/depositee/:depositeeId', getReviewByDepositeeId);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
