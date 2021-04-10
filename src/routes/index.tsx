import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../views/Login';
import HomePage from '../views/HomePage';
import Library from '../views/Library';

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
      <App />
    </BrowserRouter>
  );
};

export default AppRoutes;
