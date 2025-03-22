import { useState } from 'react'
import { Home } from './components/Home'
import { Navbar } from './components/Navbar'
import { Topbar } from './components/Topbar'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Login } from './form/Login'
import { Signup } from './form/Signup'
import { AdminDashboard } from './admin/AdminDashboard'
import { AdminNewsManage } from './admin/AdminNewsManage'
import { AdminUserManage } from './admin/AdminUserManage'
import { RoleBasedRoute } from './RoleBasedRoute'
import { Unauth } from './components/Unauth'
import { AdminNavbar } from './admin/AdminNavbar'


// import './App.css'

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState()
  const [showTopbar, setShowTopbar] = useState(true)

  const navigate = useNavigate()

  const handlerole = () => {
    setUserRole("admin")
    setIsAuthenticated(true)
    setShowNavbar(false)
    navigate("/admindash")
  }



  return (
    <>
      <button onClick={handlerole}>Click</button>
      {showTopbar && <Topbar />}
      {showNavbar && <Navbar />}
      {userRole=="admin" && <AdminNavbar/>}
      <Routes>
        <Route path='/' element={<Navigate to="/home" />}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/unauthorized' element={<Unauth/>}></Route>
        <Route path='/login' element={<Login setShowNavbar={setShowNavbar} setShowTopbar={setShowTopbar}/>}></Route>
        <Route path='/signup' element={<Signup setShowNavbar={setShowNavbar} setShowTopbar={setShowTopbar}/>}></Route>
        <Route element={<RoleBasedRoute isAuthenticated={isAuthenticated} allowedRoles={["admin"]} userRole={userRole} />}>
          <Route path='/admindash' element={<AdminDashboard/>}></Route>
          <Route path='/adminnewsmanage' element={<AdminNewsManage/>}></Route>
          <Route path='/adminusermanage' element={<AdminUserManage/>}></Route>
        </Route>
        
      </Routes>
      {/* <Home/> */}
    </>
  )
}

export default App
