import { useEffect, useState } from 'react'
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
import { JournalistNavbar } from './Journalist/JournalistNavbar'
import { CitizenDashboard } from './Citizen/CitizenDashboard'
import { CitizenSubmit } from './Citizen/CitizenSubmit'
import { CitizenNewsManage } from './Citizen/CitizenNewsManage'
import { CitizenComment } from './Citizen/CitizenComment'
import { CitizenNav } from './Citizen/CitizenNav'
import { AdminSingleNews } from './admin/AdminSingleNews'
import { AdminSingleUser } from './admin/AdminSingleUser'
import { JournalistSingleNews } from './Journalist/JournalistSingleNews'
import { JournEditq } from './Journalist/JournEditq'
import { JournEditw } from './Journalist/JournEditw'
import { AjTopbar } from './components/AjTopbar'
import { AdminFullEdit } from './admin/AdminFullEdit'
import { ManyNews } from './user/ManyNews'
import PendingApproval from './components/PendingApproval'
import { ForgetPass } from './form/ForgetPass'
import { ResetPass } from './form/ResetPass'
import { ToastContainer } from 'react-toastify'


// import './App.css'

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState()
  const [showTopbar, setShowTopbar] = useState(true)
  const [showAjTopbar, setShowAjTopbar] = useState(false)
  const [showLoginBtn,setShowLoginBtn] = useState(false)

  const navigate = useNavigate()

  var id = localStorage.getItem('userId')
  var name = localStorage.getItem('name')
  const role = localStorage.getItem('role')
  const status = localStorage.getItem('status')
  useEffect(() => {

    if (role === "admin" && status === "approved") {
      setUserRole("admin")
      setIsAuthenticated(true)
      setShowNavbar(false)
      setShowTopbar(false)
      setShowAjTopbar(true)
      navigate("/admindash")
    } else if (role === "journalist" && status === "approved") {
      setUserRole("journalist")
      setIsAuthenticated(true)
      setShowNavbar(false)
      setShowTopbar(false)
      setShowAjTopbar(true)
      navigate("/journdash")
    } else if (role === "citizen_journalist" && status === "approved") {
      setUserRole("citizen_journalist")
      setIsAuthenticated(true)
      setShowNavbar(false)
      setShowTopbar(false)
      setShowAjTopbar(true)
      navigate("/journdash")
    }
    else if (role === "reader" && status === "approved") {
      setUserRole("reader")
      setShowNavbar(true)
      setShowTopbar(true)
      setShowAjTopbar(false)
      setShowLoginBtn(false)
      setIsAuthenticated(false)
    }
    else if (role === null) {
      setUserRole(null)
      setIsAuthenticated(false)
      setShowLoginBtn(true)
      
    }
    else {
      setUserRole(null)
      setIsAuthenticated(false)
      
      setShowNavbar(true)
      setShowTopbar(true)
      setShowAjTopbar(false)
      navigate("/pendingapprovals")
    }
    }, [role])

  // const handlerole = () => {
  //   setUserRole("admin")
  //   setIsAuthenticated(true)
  //   setShowNavbar(false)
  //   setShowTopbar(false)
  //   setShowAjTopbar(true)
  //   navigate("/admindash")
  // }

  // const handlerole1 = () => {
  //   setUserRole("journalist")
  //   setIsAuthenticated(false)
  //   setShowNavbar(false)
  //   setShowTopbar(false)
  //   setShowAjTopbar(true)
  //   navigate("/journdash")
  // }

  // const handlerole2 = () => {
  //   setUserRole("citizen")
  //   setIsAuthenticated(true)
  //   setShowNavbar(false)
  //   navigate("/citizendash")
  // }

  return (
    <>
      {/* {showAjTopbar ?"Hello" : "Bye"} */}
      {/* <button onClick={handlerole}>Click</button>
      <button onClick={handlerole1}>Click1</button> */}
      {/* <button onClick={handlerole2}>Click2</button> */}
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {showTopbar && <Topbar />}
      {showNavbar && <Navbar login={showLoginBtn}/>}
      {showAjTopbar ? <AjTopbar />: <></>}

      {userRole == "admin" && <AdminNavbar />}
      {(userRole == "journalist" || userRole == "citizen_journalist")&& <JournalistNavbar />}
      {/* {userRole == "citizen" && <CitizenNav />} */}
      <Routes>
        <Route path='/' element={<Navigate to="/home" />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/categories' element={<Categories />}></Route>
        <Route path='/forget' element={<ForgetPass setShowNavbar={setShowNavbar} setShowTopbar={setShowTopbar} setShowAjTopbar={setShowAjTopbar}/>}></Route>
        <Route path='//resetpassword/:token' element={<ResetPass setShowNavbar={setShowNavbar} setShowTopbar={setShowTopbar} setShowAjTopbar={setShowAjTopbar}/>}></Route>
        <Route path='/pendingapprovals' element={<PendingApproval />}></Route>
        <Route path='/category/:categoryName' element={<Category />}></Route>
        {/* <Route path='/category' element={<Category/>}></Route> */}
        <Route path='/states' element={<State_City />}></Route>
        {/* <Route path='/single' element={<SingleNews/>}></Route> */}
        <Route path="/single/:type/:newsId" element={<SingleNews />} />
        <Route path="/state/:type/:name" element={<State_City_One />} />
        <Route path="/manynews/:isTrend/:isPop/:val" element={<ManyNews />} />



        {/* <Route path='/journeditq' element={<JournEditq/>} /> */}




        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/unauthorized' element={<Unauth />}></Route>
        <Route path='/login' element={<Login setShowNavbar={setShowNavbar} setShowTopbar={setShowTopbar} setShowAjTopbar={setShowAjTopbar} />}></Route>
        <Route path='/signup' element={<Signup setShowNavbar={setShowNavbar} setShowTopbar={setShowTopbar} />}></Route>
        <Route element={<RoleBasedRoute isAuthenticated={isAuthenticated} allowedRoles={["admin"]} userRole={userRole} />}>
          <Route path='/admindash' element={<AdminDashboard />}></Route>
          <Route path='/adminnewsmanage' element={<AdminNewsManage />}></Route>
          <Route path='/adminusermanage' element={<AdminUserManage />}></Route>
          <Route path="/adminsingleuser/:id" element={<AdminSingleUser />} />
          <Route path="/adminsingle/:id" element={<AdminSingleNews />} />
          <Route path='/adminfulledit/:id' element={<AdminFullEdit />} />
        </Route>

        <Route element={<RoleBasedRoute isAuthenticated={isAuthenticated} allowedRoles={["journalist","citizen_journalist"]} userRole={userRole} />}>
          <Route path='/journDash' element={<JournalistDash />} />
          <Route path='/journSubmit' element={<JournalistSubmit />} />
          <Route path="/journsinglenews/:id" element={<JournalistSingleNews />} />
          <Route path='/journalistNewsManage' element={<JournalistNewsManage />} />
          <Route path='/journalistcomment' element={<JournalistComment />} />
          <Route path="/comments/:articleId/:commentId?" element={<JournalistComment />} />
          <Route path='/journeditw/:id' element={<JournEditw />} />
          <Route path='/journSubmit/:id' element={<JournalistSubmit />} />
        </Route>

        {/* <Route element={<RoleBasedRoute isAuthenticated={isAuthenticated} allowedRoles={["citizen"]} userRole={userRole} />}> */}
          {/* <Route path='/citizendash' element={<CitizenDashboard />} /> */}
          {/* <Route path='/citizensubmit' element={<CitizenSubmit />} /> */}
          {/* <Route path='/citizennews' element={<CitizenNewsManage />} /> */}
          {/* <Route path='/citizencomment' element={<CitizenComment />} /> */}
          {/* <Route path='/citizennav' element={<CitizenNav/>} />  */}
        {/* </Route> */}


      </Routes>
      {/* <Home/> */}
    </>
  )
}

export default App
