import { Landing } from './View/Landing/Landing'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import { InicioTest } from './TestVocacional/InicioTest'
import { TestVocacional } from './TestVocacional/preguntas'
import { Enviar } from './TestVocacional/enviar'
import { Final } from './TestVocacional/final'
import { InicioVocacion } from './CarreravsVocacion/InicioTest'
import { Vocacion } from './CarreravsVocacion/preguntas'
import { EnviarVocacion } from './CarreravsVocacion/enviar'
import { FinalVocacion } from './CarreravsVocacion/final'
import { Secundaria } from './Secundaria/preguntasH'
import { EnviarSecundaria } from './Secundaria/enviarH'
import { FinalSecundaria } from './Secundaria/finalH'
import { InicioSecundaria } from './Secundaria/InicioTestH'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}></Route>
      <Route path='/testvocacional' element={<InicioTest/>}></Route>
      <Route path='/testvocacional/preguntas' element={<TestVocacional/>}></Route>
      <Route path='/testvocacional/enviar' element={<Enviar/>}></Route>
      <Route path='/testvocacional/gracias' element={<Final/>}></Route>
      <Route path='/mivocacion' element={<InicioVocacion/>}></Route>
      <Route path='/mivocacion/preguntas' element={<Vocacion/>}></Route>
      <Route path='/mivocacion/enviar' element={<EnviarVocacion/>}></Route>
      <Route path='/mivocacion/gracias' element={<FinalVocacion/>}></Route>
      <Route path='/secundaria' element={<InicioSecundaria/>}></Route>
      <Route path='/secundaria/preguntas' element={<Secundaria/>}></Route>
      <Route path='/secundaria/enviar' element={<EnviarSecundaria/>}></Route>
      <Route path='/secundaria/gracias' element={<FinalSecundaria/>}></Route>
    </Routes>
        
    </>
  )
}

export default App
