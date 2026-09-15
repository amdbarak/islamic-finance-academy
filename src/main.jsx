import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Storage polyfill for web browsers
if (typeof window !== 'undefined' && !window.storage) {
  window.storage = {
    async get(key) {
      const val = localStorage.getItem(key);
      return val ? { value: val } : null;
    },
    async set(key, value) {
      localStorage.setItem(key, value);
      return true;
    },
    async delete(key) {
      localStorage.removeItem(key);
      return true;
    }
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
