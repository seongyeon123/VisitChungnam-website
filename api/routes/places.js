import express from 'express';
import {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  getPlaceReviews,
} from '../controllers/place.js';
import Place from '../models/Place.js'; // Place 모델을 import 합니다.

const router = express.Router();

// 모든 관광 명소 가져오기
router.get('/', getPlaces);

// 특정 카테고리의 관광 명소 가져오기
router.get('/category/:category', async (req, res, next) => {
  const category = req.params.category;
  try {
    const places = await Place.find({ category });
    res.json(places);
  } catch (err) {
    next(err);
  }
});

// 새로운 관광 명소 생성하기
router.post('/', createPlace);

// 특정 관광 명소 가져오기
router.get('/:id', getPlaceById);

// 관광 명소 업데이트
router.put('/:id', updatePlace);

// 관광 명소 삭제
router.delete('/:id', deletePlace);

// 특정 관광 명소의 리뷰 가져오기
router.get('/:id/reviews', getPlaceReviews);

export default router;
