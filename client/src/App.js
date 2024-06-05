import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
 } from "react-router-dom";
import Home from './components/Home/Home';
import CityList from './components/CityList/CityList';
import PlaceDetail from './components/Detail/PlaceDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MyPage from './pages/auth/Mypage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:category" element={<CityList />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
