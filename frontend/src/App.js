import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux'

import './App.css';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';
import PrivateRoute from './protectedRoutes/PrivateRoutes.tsx'
import store from './store/index.js';



function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Login/>}/>

        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
