import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AttachAccessToken from '../components/AttachAccessToken';
import HomePage from '../views/HomePage';
import Library from '../views/Library';
import Login from '../views/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/library" element={<Library />} />
    </Routes>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AttachAccessToken />
      <App />
    </BrowserRouter>
  );
};

export default AppRoutes;
