import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './component/Login'
import Dashboard from './component/Dashboard'
import Users from './component/Users'
import Setting from './component/Setting'
import Project from './component/Project'
import Leaves from './component/Leaves'
import AttendanceReport from './component/AttendanceReport'
import AttendanceSummary from './component/AttendanceSummary'
import NotFound from './component/NotFound' // Make sure this is added

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/setting' element={<Setting/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/project' element={<Project/>}/>
        <Route path='/leaves' element={<Leaves/>}/>
        <Route path='/attendanceReport' element={<AttendanceReport/>} />
        <Route path='/attendanceSummary' element={<AttendanceSummary/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>

    
  )
}

export default App;
