import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import MoldManager from './components/MoldManager';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate('/');
      else setUser(user);
    };

    fetchUser();
  }, [navigate]);

  return user ? children : null;
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
