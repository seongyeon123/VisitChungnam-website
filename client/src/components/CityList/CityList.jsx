import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Navbar from '../Navbar/Navbar';
import './list.css';

const CityList = () => {
  const { category } = useParams();
  const { data: places, loading, error } = useFetch(`${process.env.REACT_APP_API_URL}/places/category/${category}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Navbar />
      <div className="list-container">
        <div className="list">
          <h1>주요 명소</h1>
          {places.map((place) => (
            <Link key={place._id} to={`/place/${place._id}`} className="list-item">
              {place.images && place.images[0] && (
                <img src={place.images[0]} alt={place.name} className="list-item-img" />
              )}
              <div className="text">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CityList;
