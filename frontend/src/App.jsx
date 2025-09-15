import React from 'react'
import Inputform from './Component/Inputform'
import Loginform from './Component/Loginform'
import Signupform from './Component/Signupform'
import { Routes, Route } from "react-router-dom"
import { Navigate } from 'react-router-dom'
import Error from "./Component/Error"
import Data from "./Component/Data"
import { useState } from "react"
import WrongRoute from "./Component/WrongRoute"
import RefreshHandler from './Component/RefreshHandler'

const App = () => {

  const [isauthenticated, setisauthenticated] = useState(localStorage.getItem('token'));

  return (
    <>
    {isauthenticated ? <RefreshHandler/> : null}
      <Routes>
        <Route path="/" element={isauthenticated ? <Navigate to = "/data"/> : <Navigate to="/login" />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/signup" element={<Signupform />} />
        <Route path="/data" element={isauthenticated ? <Data /> : <Error />} />
        <Route path="*" element={<WrongRoute/>}/>
      </Routes>
    </>
  )
}

export default App