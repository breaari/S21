import { Landing } from './View/Landing/Landing'
import { Routes, Route } from 'react-router-dom'
import React from 'react'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>
    </Routes>
        
    </>
  )
}

export default App
