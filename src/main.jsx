import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import 'izitoast/dist/css/iziToast.min.css';
import { store } from './store';
import { Provider } from 'react-redux';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
