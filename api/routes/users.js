import express from 'express';
import { registerUser, getUserById, getAllUsers, updateUser, deleteUser, getUserReviews } from '../controllers/user.js';
import { verifyToken, verijsonwebtokenfyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// 사용자 등록
router.post('/register', registerUser);

// 특정 사용자 가져오기
router.get('/:userId', verijsonwebtokenfyUser, getUserById);

// 모든 사용자 가져오기
router.get('/', verifyAdmin, getAllUsers);

// 사용자 업데이트
router.put('/:userId', verijsonwebtokenfyUser, updateUser);

// 사용자 삭제
router.delete('/:userId', verijsonwebtokenfyUser, deleteUser);

// 특정 사용자의 리뷰 가져오기
router.get('/:userId/reviews', verijsonwebtokenfyUser, getUserReviews);

export default router;
