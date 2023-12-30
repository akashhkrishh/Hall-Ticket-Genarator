import axios from 'axios';
import { toast } from 'react-toastify';


axios.defaults.baseURL = "http://localhost:3656"
axios.defaults.validateStatus = (s)=>{
    return s<300 || s==401 || s == 403
}

axios.interceptors.request.use((config)=>{

    config.headers.setAuthorization(localStorage.getItem('htoken'))
    return config;

})


axios.interceptors.response.use((res)=>{
    if(res.status==401){
        localStorage.removeItem('htoken')
        alert("Invalid")
    }

    if(res.status == 403){
        toast.error("Unauthorized");
        window.nav('/admin');     
    }
  
    return res;
  })

export default axios;
export {
    axios as apiHelper
}