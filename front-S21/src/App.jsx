import { Landing } from './View/Landing/Landing'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import { InicioTest } from './TestVocacional/InicioTest'
import { TestVocacional } from './TestVocacional/preguntas'
import { Enviar } from './TestVocacional/enviar'
import { Final } from './TestVocacional/final'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}></Route>
      <Route path='/testvocacional' element={<InicioTest/>}></Route>
      <Route path='/testvocacional/preguntas' element={<TestVocacional/>}></Route>
      <Route path='/testvocacional/enviar' element={<Enviar/>}></Route>
      <Route path='/testvocacional/gracias' element={<Final/>}></Route>
    </Routes>
        
    </>
  )
}

export default App
