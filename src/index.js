import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MoldManager from './components/MoldManager'; // MoldManager 컴포넌트 임포트
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoldManager /> {/* MoldManager 컴포넌트 렌더링 */}
  </React.StrictMode>
);

reportWebVitals();
