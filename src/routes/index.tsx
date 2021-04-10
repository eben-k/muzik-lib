import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../views/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
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
