import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 전역 오류 핸들러
window.onerror = function (message, source, lineno, colno, error) {
  console.error('전역 오류 발생:', message, source, lineno, colno, error);
  // 오류 로깅 서비스에 오류 전송 (예: Sentry, LogRocket)
  // ...
  return false; // 브라우저의 기본 오류 처리 방지
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
