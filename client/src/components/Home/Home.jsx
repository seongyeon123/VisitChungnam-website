import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Navbar from '../Navbar/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const cities = [
    { name: '천안', category: 'cheonan', image: 'https://img.khan.co.kr/news/2022/09/04/news-p.v1.20220904.0fb112ab0f8348b58f52d0a462434f15_P1.jpg' },
    { name: '당진', category: 'dangjin', image: 'https://www.ccnnews.co.kr/news/photo/202306/297219_370760_1049.png' },
    { name: '아산', category: 'asan', image: 'https://mblogthumb-phinf.pstatic.net/MjAyMzA1MDJfMjA0/MDAxNjgyOTczMDIyMTk5.BjXBBsfDhhYnVS7ph17sQRLRAlBMazS1COcW5c5zqfYg.uMm0y1-cZ05pWZPhwv-x9ahKjE7sTKYBNABUwRxCY6wg.JPEG.ainihs/20230501%EF%BC%BF162503.jpg?type=w800' },
    { name: '보령', category: 'boryeong', image: 'https://www.brcn.go.kr/prog/attraction/tour/sub01_01/attractionImage_down.do?attractionCode=31' },
    { name: '공주', category: 'gongju', image: 'https://www.gongju.go.kr/thumbnail/tursmCn/920_TUCN_202004270548586404.jpg' },
    { name: '대천', category: 'daecheon', image: 'https://www.brcn.go.kr/prog/attraction/tour/sub01_15/attractionImage_down.do?attractionCode=6' },
    { name: '서산', category: 'seosan', image: 'https://cdn.jbnews.com/news/photo/202312/1419968_1236276_1751.jpg' },
    { name: '논산', category: 'nonsan', image: 'https://cdn.kktoday.co.kr/news/photo/202301/13990_12199_3230.jpg' },
    { name: '계룡', category: 'gyeryong', image: 'https://lh3.googleusercontent.com/proxy/1Yf8rH5bhodJnA4EJjh7Zrw2hHcxdRvyz-Bcb545b2LtdaixqTK3KbhDX3l37RG2iEZa_1y5VDXhsj2oNEQy5fh42Y8HOa0_dDyQl7s'}
  ]; // 예시 도시 목록

  const handleCardClick = (category) => {
    navigate(`/city/${category}`);
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-grid">
          {cities.map((city) => (
            <div
              key={city.category}
              className="home-card"
              onClick={() => handleCardClick(city.category)}
            >
              <img src={city.image} alt={city.name} className="home-card-img" />
              <div className="home-card-title">{city.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
