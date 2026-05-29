import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { loadStylesheet } from './utils/loadStylesheet';
import './styles.css';

const scheduleIdle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200));
scheduleIdle(() => {
  import('./styles/deferred.css');
  loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
