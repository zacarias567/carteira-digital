import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import History from '../pages/History';
import CardPage from '../pages/CardPage';
import Profile from '../pages/Profile';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/historico" element={<History />} />
      <Route path="/cartao" element={<CardPage />} />
      <Route path="/perfil" element={<Profile />} />
    </Routes>
  );
}
