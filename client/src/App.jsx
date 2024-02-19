import React from 'react'
import Navbar from './Components/Navbar'
import Notes from './Components/Notes'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateNotes from './Components/Dashboard/CreateNotes'
import NewNotes from './Components/Dashboard/NewNotes'
import AllNotes from './Components/Dashboard/AllNotes'
import Register from './Components/Authorization/Register'
import Login from './Components/Authorization/login'
import EditNotes from './Components/Dashboard/EditNotes'

const App = () => {
  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
        <Route path='/' element={<Notes/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/createNotes' element={<CreateNotes/>}/>
        <Route path='/note/addNotes' element={<NewNotes/>}/>
        <Route path='/dashboard' element={<AllNotes/>}/>
        <Route path='/editNotes/:id' element={<EditNotes/>}/>
    </Routes>
   
    </Router>
    </>
  )
}

export default App
