import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Auth.css'; // 스타일 파일 import

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // 모드 전환 상태

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.error_description || error.message);
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
