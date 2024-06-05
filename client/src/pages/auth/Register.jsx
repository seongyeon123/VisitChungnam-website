import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import "./auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: '',
    city: '',
    phone: '',
    password: '',
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData); // 디버깅용 로그
    dispatch({ type: "LOGIN_START" });
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiUrl}/auth/register`, formData);
      console.log("Registration successful", res.data); // 디버깅용 로그
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      alert('회원가입 성공!');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed', err); // 디버깅용 로그
      dispatch({ type: "LOGIN_FAILURE", payload: err.response ? err.response.data : err.message });
      alert('회원가입 실패: ' + (err.response ? err.response.data.message : err.message));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 onClick={() => window.location.href = '/'}>Visit Chungnam</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">아이디</label>
            <input type="text" id="username" name="username" placeholder="아이디를 입력하세요" required onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" name="email" placeholder="이메일을 입력하세요" required onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="country">국가</label>
            <input type="text" id="country" name="country" placeholder="국가를 입력하세요" required onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="city">도시</label>
            <input type="text" id="city" name="city" placeholder="도시를 입력하세요" required onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="phone">전화번호</label>
            <input type="text" id="phone" name="phone" placeholder="전화번호를 입력하세요" required onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요" required onChange={handleChange} />
          </div>
          <button type="submit" disabled={loading} className="submit-button">회원가입</button>
        </form>
        {error && <span className="error-message">{error.message}</span>}
      </div>
    </div>
  );
}

export default Register;
