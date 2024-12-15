import { useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import Dash from './Pages/Dash'
import Auth from './Pages/Auth'
import Landing from './Pages/Landing'
import History from './Pages/History'
import High from './Pages/High'
import Medium from './Pages/Medium'
import Low from './Pages/Low'
import Pendings from './Pages/Pendings'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/dashboard' element={<Dash/>}/>
        <Route path='/login' element={<Auth />}/>
        <Route path='/register' element={<Auth isReg={true}/>}/>
        <Route path='/history' element={<History />}/>
        <Route path='/high' element={<High />}/>
        <Route path='/medium' element={<Medium />}/>
        <Route path='/low' element={<Low />}/>
        <Route path='/pendingtask' element={<Pendings />}/>
      </Routes>
    </>
  )
}

export default App
