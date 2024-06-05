import Review from "../models/Review.js";
import Place from "../models/Place.js";

// 특정 관광 명소에 리뷰 추가
export const addReview = async (req, res) => {
  const { placeId, title, content, image, rating } = req.body;

  try {
    const newReview = new Review({
      title,
      content,
      image,
      rating,
      userId: req.user.id,
      placeId,
    });

    const review = await newReview.save();

    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ msg: 'Place not found' });
    }

    place.reviews.push(review._id.toString());  // 리뷰 ID를 문자열로 저장
    await place.save();

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// 특정 리뷰 가져오기
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// 리뷰 삭제
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    // Place에서 리뷰 ID 삭제
    await Place.updateOne(
      { reviews: req.params.id },
      { $pull: { reviews: req.params.id } }
    );

    await review.remove();
    res.json({ msg: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
