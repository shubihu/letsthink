import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import App from './App';
import './assets/i18nConfig';

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);
