import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/all.min.css';
import { BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './assets/scss/main.scss';
import {UserProvider} from "./context/UserContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <UserProvider>
          <App />
          </UserProvider>
      </BrowserRouter>

  </StrictMode>,
)
