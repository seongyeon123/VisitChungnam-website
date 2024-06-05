import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState, useContext } from "react";
import "./auth.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Login button clicked", credentials); // 디버깅용 로그
    dispatch({ type: "LOGIN_START" });
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiUrl}/auth/login`, credentials, { withCredentials: true });
      console.log("Login successful", res.data); // 디버깅용 로그
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate('/');
    } catch (err) {
      console.error('Login failed', err); // 디버깅용 로그
      const errorMessage = err.response?.data?.message || err.message || "로그인에 실패했습니다.";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      alert('로그인 실패: ' + errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>로그인</h2>
        <form>
          <div className="input-group">
            <label htmlFor="username">아이디</label>
            <input type="text" id="username" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" onChange={handleChange} required />
          </div>
          <button type="submit" disabled={loading} onClick={handleClick} className="submit-button">
            로그인
          </button>
          <Link to="/register">
            <button type="button" className="link-button">회원가입</button>
          </Link>
        </form>
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
};

export default Login;
