import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './mypage.css';

const MyPage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: '',
    city: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        country: user.country,
        city: user.city,
        phone: user.phone
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/${user._id}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      alert('정보가 성공적으로 수정되었습니다.');
    } catch (err) {
      console.error(err);
      alert('정보 수정에 실패했습니다.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="my-page-container">
        <h1>마이페이지</h1>
        <form className="my-page-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">아이디</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="country">국가</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="city">도시</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="phone">전화번호</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-button">수정</button>
        </form>
      </div>
    </>
  );
};

export default MyPage;
