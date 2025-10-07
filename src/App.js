import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import OpenRoute from './components/core/OpenRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import Error from './pages/Error'
import UpdatePassword from './pages/UpdatePassword'
import ForgotPassword from './pages/ForgotPassword'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivateRoute from '../src/components/core/PrivateRoute'
import Dashboard from './pages/Dashboard'
import MyProfile from '../src/components/Dashboard/MyProfile'
import Settings from './components/Dashboard/Settings'
import Cart from '../src/components/core/auth/Cart'
import { ACCOUNT_TYPE } from "./utils/constants"
import EnrolledCourses from './components/Dashboard/EnrolledCourse'
import {  useSelector } from "react-redux";
import AddCourse from './components/Dashboard/Addcourse'
import EditCourse from './components/Dashboard/Addcourse/EditCourse'
import MyCourses from './components/Dashboard/Addcourse/MyCourses'
import Instructor from './components/Instructor'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import ViewCourse from './pages/ViewCourse'





function App  ()  {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
     <Navbar/>
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/about" element={<About />} />
       <Route path="/contact" element={<Contact />} />
       <Route path="courses/:courseId" element={<CourseDetails />} />
       <Route path="/catalog/:catalogName" element={<Catalog />} />
       <Route path="/catalog" element={<Catalog />} />       
       <Route
           path="signup"
           element={
            //  <OpenRoute>
               <Signup />
            //  </OpenRoute>
           }
         />
     <Route
           path="login"
           element={
            //  <OpenRoute>
               <Login />
            //  </OpenRoute>
           }
         />
 
     <Route
           path="forgot-password"
           element={
             <OpenRoute>
               <ForgotPassword />
             </OpenRoute>
           }
         />  
 
       <Route
           path="verify-email"
           element={
             <OpenRoute>
               <VerifyEmail />
             </OpenRoute>
           }
         />  
 
     <Route
           path="update-password/:id"
           element={
             <OpenRoute>
               <UpdatePassword />
             </OpenRoute>
           }
         />  
 
 
     <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            </>
            
          )}

           {/* For the watching course lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />            
            </>
          )}
        </Route>
     <Route path="*" element={<Error />} />
     </Routes>
 
    </div>
   );
 }
 
 export default App;