import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Auth.css';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.error_description || error.message);
    } else {
      // 에러가 없을 때 페이지 이동
      navigate('/mold-management'); // 원하는 경로로 변경 가능
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button type="submit" disabled={loading} className="auth-button">
          {isSignup ? 'Sign up' : 'Log in'}
        </button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)} className="auth-toggle-button">
        {isSignup ? 'Switch to Log in' : 'Switch to Sign up'}
      </button>
    </div>
  );
};

export default Auth;
