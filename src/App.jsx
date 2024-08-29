
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Authorization from './Pages/Authorization'
import Project from './Pages/Project'
import Dashboard from './Pages/Dashboard'

import Footer from './Components/Footer'
import PageNotFound from './Pages/PageNotFound'
import { useContext } from 'react'
import { isLoginAuthContext } from './Context/ContextShare'
function App() {

const {isLoginStatus}=useContext(isLoginAuthContext)
  return (
    <>
   
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Authorization register/>} />
      <Route path="/login" element={<Authorization/>} />
      <Route path="/project" element={<Project/>} />
      <Route path="/dashboard" element={isLoginStatus?<Dashboard/>:<PageNotFound/>} />
      <Route path="*" element={<PageNotFound/>} />
     </Routes>
    <Footer/>
    </>
  )
}

export default App
