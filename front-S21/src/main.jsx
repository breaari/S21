import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { TestProvider } from './TestVocacional/TestContext.jsx'
import { TestProvider2 } from './CarreravsVocacion/TestContext2.jsx'


// axios.defaults.baseURL = 'http://localhost:3003'
axios.defaults.baseURL = 'https://back.universidadsiglo21online.com'
// axios.defaults.baseURL = 'https://s21-back.vercel.app/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TestProvider2>
  <TestProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </TestProvider>
  </TestProvider2>,
)
