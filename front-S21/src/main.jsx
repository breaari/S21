import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.baseURL = 'https://back.universidadsiglo21online.com'
// axios.defaults.baseURL = 'https://s21-back.vercel.app/'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
