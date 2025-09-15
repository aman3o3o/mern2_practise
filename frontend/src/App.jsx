import React from 'react'
import Inputform from './Component/Inputform'
import Loginform from './Component/Loginform'
import Signupform from './Component/Signupform'
import { Routes , Route } from "react-router-dom"
import { Navigate } from 'react-router-dom'

const App = () => {

  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<Loginform/>}/>
      <Route path="signup" element={<Signupform/>}/>
    </Routes>
    </>
  )
}

export default App

