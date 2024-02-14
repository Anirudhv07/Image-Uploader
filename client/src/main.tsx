import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux';
import store from './assets/redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-right" hideProgressBar={true} autoClose={2000} />
      <App />
    </Provider>
  </React.StrictMode>,
)
