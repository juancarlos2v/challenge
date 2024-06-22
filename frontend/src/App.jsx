import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import './App.css'
import Register from "@pages/Register.jsx";
import Login from "@pages/Login.jsx";
import Reset from "@pages/Reset.jsx";

function App() {
  return (
        <>
            <Routes>
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/reset' element={<Reset />} />
            </Routes>
        </>
  )
}

export default App
