import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';

import {AuthProvider} from './context/AuthContext.tsx'
import PrivateRoute from './protectedRoutes/PrivateRoutes.tsx'



function App() {
  return (
    <>
    <AuthProvider>
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Login/>}/>

        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      </Routes>
    </Router>
    </AuthProvider>
    
    </>
  );
}

export default App;
