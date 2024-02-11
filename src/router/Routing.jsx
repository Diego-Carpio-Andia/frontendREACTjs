import React from 'react'
import { Routes, Route, BrowserRouter, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from '../context/AuthProvider';
import { Login } from '../components/user/login';
import { Deligencia } from '../components/user/deligencia';
import { Webscrapping } from '../components/webscrapping/webscrapping';

export const Routing = () => {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/diligencia" element={<Deligencia></Deligencia>}></Route>
            <Route path='/webscrapping' element={<Webscrapping></Webscrapping>}></Route>

            <Route path="*" element={
              <>
                <p>
                  <h1>Error 404</h1>
                  <Link to="/">Volver al inicio</Link>
                </p>
              </>
            }></Route>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    )
  }
  