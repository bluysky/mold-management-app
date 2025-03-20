import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    let response;
    if (isSignup) {
      response = await supabase.auth.signUp({ email, password });
    } else {
      response = await supabase.auth.signInWithPassword({ email, password });
    }

    console.log("Auth Response:", response); // 로그 출력하여 확인

    const { error, data } = response;
    
    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("User signed in:", data);
      if (isSignup && !data.user) {
        setErrorMessage('Check your email to verify your account.'); // 이메일 인증 필요
      } else {
        navigate('/mold-management');
      }
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
        {errorMessage && <p className="auth-error">{errorMessage}</p>} {/* 에러 메시지 표시 */}
        <button type="submit" disabled={loading} className="auth-button">
          {loading ? 'Processing...' : isSignup ? 'Sign up' : 'Log in'}
        </button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)} className="auth-toggle-button">
        {isSignup ? 'Switch to Log in' : 'Switch to Sign up'}
      </button>
    </div>
  );
};

export default Auth;
