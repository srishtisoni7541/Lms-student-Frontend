import { Route, Routes } from 'react-router-dom'
import Landingpage from './pages/LandingPage'
import LoginPage from './components/Login'
import RegisterPage from './components/Register'
import ResetPasswordForm from './components/ResetPasswordForm'
import HomePage from './pages/HomePage'
import CourseDetailPage from './pages/CourseDetailPage'
import CertificateCard from './components/CertificatePage'
const App = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
     <Routes>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path="/course/:id" element={<CourseDetailPage />} />
      <Route path='/my-certificates' element={<CertificateCard/>}/>
      {/* <Route path='/course/:id' element={<CourseDetails/>}/> */}
      <Route path='/reset-password/:token' element={<ResetPasswordForm/>}/>
     </Routes>
    </div>
  )
}

export default App
