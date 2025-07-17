import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { TestProvider } from './TestVocacional/TestContext.jsx'


axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.baseURL = 'https://back.universidadsiglo21online.com'
// axios.defaults.baseURL = 'https://s21-back.vercel.app/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TestProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </TestProvider>,
)
