import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import MoldManager from './components/MoldManager';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate('/');
      else setUser(user);
      setLoading(false);  // 로딩 완료
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <div>Loading...</div>; // 로딩 중일 때 메시지 표시
  return user ? children : <div>Redirecting...</div>;
};

const App = () => {
  return (
    <Router basename="/bluysky/mold-management-app">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/mold-management" element={<ProtectedRoute><MoldManager /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
