import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { loadStylesheet } from './utils/loadStylesheet';
import './styles.css';

const scheduleIdle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200));
scheduleIdle(() => {
  import('./styles/deferred.css');
  // Font Awesome sudah di-preload dari index.html
  loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
