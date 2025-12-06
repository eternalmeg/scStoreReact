import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/all.min.css';
import './assets/scss/main.scss';
import { BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>

  </StrictMode>,
)
