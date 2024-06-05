

// import Place from "../models/Place.js";
// import Review from "../models/Review.js";

import Place from "../models/Place.js";
import Review from "../models/Review.js";

// 모든 관광 명소 가져오기
export const getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// 새로운 관광 명소 생성하기
export const createPlace = async (req, res) => {
  const { name, description, location, category, images } = req.body;

  try {
    const newPlace = new Place({
      name,
      description,
      location,
      category,
      images,
    });

    const place = await newPlace.save();
    res.json(place);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// 특정 관광 명소 가져오기
export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ msg: 'Place not found' });
    }
    res.json(place);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// 관광 명소 업데이트
export const updatePlace = async (req, res) => {
  const { name, description, location, category, images } = req.body;

  const updatedPlace = {
    name,
    description,
    location,
    category,
    images,
  };

  try {
    let place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ msg: 'Place not found' });
    }

    place = await Place.findByIdAndUpdate(
      req.params.id,
      { $set: updatedPlace },
      { new: true }
    );

    res.json(place);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// 관광 명소 삭제
export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ msg: 'Place not found' });
    }

    await place.remove();
    res.json({ msg: 'Place removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// 특정 관광 명소의 리뷰 가져오기
export const getPlaceReviews = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ msg: 'Place not found' });
    }
    const reviews = await Review.find({ placeId: place._id });
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};




// controllers/placeController.js



// 해당 카테고리의 관광지 가져오기
export const getPlacesByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const places = await Place.find({ category: category });
    res.json(places);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
