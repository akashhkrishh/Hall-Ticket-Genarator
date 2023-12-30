import { Outlet, Navigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
const PrivateRoutes = () => {

    const htoken = localStorage.getItem('htoken')

    let auth = {'htoken':htoken!=null && htoken!=""}
    return(
        auth.htoken ? <main >
            <NavBar />
            <div className="w-full h-[10vh]"></div>    
            <Outlet /> 
        </main>: <Navigate to="/admin"/>
    )
}

export default PrivateRoutes