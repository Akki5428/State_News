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
import { Contact } from './user/Contact'
import { Category } from './user/Category'
import { Categories } from './user/Categories'
import { State_City } from './user/State_City'
import { State_City_One } from './user/State_City_One'
import { SingleNews } from './user/SingleNews'
import { JournalistDash } from './Journalist/JournalistDash'
import { JournalistSubmit } from './Journalist/JournalistSubmit'
import { JournalistNewsManage } from './Journalist/JournalistNewsManage'
import { JournalistComment } from './Journalist/JournalistComment'


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
        <Route path='/categories' element={<Categories/>}></Route>
        <Route path='/category/:categoryName' element={<Category/>}></Route>
        {/* <Route path='/category' element={<Category/>}></Route> */}
        <Route path='/states' element={<State_City/>}></Route>
        {/* <Route path='/single' element={<SingleNews/>}></Route> */}
        <Route path="/single/:type/:newsId" element={<SingleNews/>} />
        <Route path="/state/:type/:name" element={<State_City_One/>} />

        <Route path='/journDash' element={<JournalistDash/>} />
        <Route path='/journSubmit' element={<JournalistSubmit/>} />
        <Route path='/journalistNewsManage' element={<JournalistNewsManage/>} />
        <Route path='/journalistcomment' element={<JournalistComment/>} />

        <Route path='/contact' element={<Contact/>}></Route>
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
