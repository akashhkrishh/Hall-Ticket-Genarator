import { Route, Router, Routes, useNavigate } from "react-router-dom"
import LoginScreen from "./screens/LoginScreen";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddNewStudent, AddNewSubject, AdminLogin, Dashboard, StudentList, SubjectList } from "./screens/admin";
import PrivateRoutes from "./auth/PrivateRoutes";
import Hallticket from "./screens/Hallticket";
const toastContainerOptions = {
  position: 'top-right',
  autoClose: 1000, 
};


function App() {
  window.nav = useNavigate();
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/addstudent" exact element={<AddNewStudent/>} />
          <Route path="/subjectlist" exact element={<SubjectList/>} />
          <Route path="/addsubject" exact element={<AddNewSubject/>} />
          <Route path="/dashboard" exact element={<Dashboard/>} />
          <Route path="/studentlist" exact element={<StudentList/>} />
        </Route>
        <Route path="/" exact element={<LoginScreen/>} />
        <Route path="/admin" exact element={<AdminLogin/>} />
        <Route path="/hallticket" exact element={<Hallticket/>} />
      </Routes>
      <ToastContainer {...toastContainerOptions} />
    </>
  )
}

export default App