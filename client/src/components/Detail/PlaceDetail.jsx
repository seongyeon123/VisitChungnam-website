import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Slider from "react-slick";
import Navbar from '../Navbar/Navbar';
import './placeDetail.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PlaceDetail = () => {
  const { id } = useParams();
  const { data: place, loading: placeLoading, error: placeError } = useFetch(`${process.env.REACT_APP_API_URL}/places/${id}`);

  if (placeLoading) return <div>Loading...</div>;
  if (placeError) return <div>Error: {placeError.message}</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <>
      <Navbar />
      <div className="place-detail-container">
        <h1 className="place-title">{place.name}</h1>
        <div className="place-info">
          <p className="place-description">{place.description}</p>
          <p className="place-location"><strong>주소:</strong> {place.location}</p>
        </div>

        {place.images && place.images.length > 0 && (
          <Slider {...settings} className="place-images-slider">
            {place.images.map((image, index) => (
              <div key={index} className="slider-image-container">
                <img src={image} alt={place.name} className="place-image" />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
};

export default PlaceDetail;
