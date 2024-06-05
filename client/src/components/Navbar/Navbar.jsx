import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 제거
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <Link to="/">Visit Chungnam</Link>
      </div>
      <div className="navbar-links">
        <Link to="/mypage">마이페이지</Link>
        {user ? (
          <button className="logout-button" onClick={handleLogout}>로그아웃</button>
        ) : (
          <>
            <Link to="/register">회원가입</Link>
            <Link to="/login">로그인</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
