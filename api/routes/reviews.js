import express from 'express';
import { addReview, getReviewById, deleteReview } from '../controllers/review.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// 특정 관광 명소에 리뷰 추가
router.post('/', verifyToken, addReview);

// 특정 리뷰 가져오기
router.get('/:id', getReviewById);

// 리뷰 삭제
router.delete('/:id', verifyToken, deleteReview);

export default router;
