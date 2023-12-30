import { useState } from "react";
import { LoginImg } from "../assets/images";
import { validateReg } from "../utils/validation";
import { apiHelper } from "../utils/utils";
import { useNavigate } from "react-router-dom";


function LoginScreen() {
    const [regno,setReg] = useState();
    const [dob,setDOB] = useState();
 
    const nav = useNavigate();

    const handleClick = (e) =>{
        e.preventDefault();
        if(!validateReg(regno)){
            console.log(dob);
        }else{
        apiHelper.post("/api/open/login",{
            regno: regno,
            dob: dob,
        }).then((res)=>{
            localStorage.setItem('reg',res.data._id)
            nav("/hallticket");
        }
        )
        .catch((err)=>{console.log(err.response.data)});
    }
       
    }
   return (
    <form onSubmit={handleClick} className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
        <div className="bg-main flex gap-5 flex-col p-4 rounded-md shadow-xl w-full overflow-hidden" style={{maxWidth:"400px",minHeight:"400px"}}>
            <h1 className="w-full text-xl font-semibold text-white text-center">{"Student Login Page"}</h1>
            <img src={LoginImg} className="w-full rounded-md " alt="" />
            <div className="flex gap-2 flex-col">
                <label className="text-white"  htmlFor="regno">{"Registration Number"}</label>
                <input className="input text-center" 
                autoComplete="off" onChange={(e)=>setReg(e.target.value)} id="regno" type="number" required/>

            </div>
            <div className="flex gap-2 flex-col">
                <label className="text-white"  htmlFor="regno">{"Date of Birth (dd-mm-yyyy)"}</label>
                <input className="input text-center"
                autoComplete="off" onChange={(e)=>setDOB(e.target.value)}  id="regno" type="date" required/>
            </div>
            <div className="flex gap-2 flex-col">
                <button onClick={handleClick} className="button">{"Get Your Hallticket"}</button>
            </div>
        </div>
    </form>
  )
}

export default LoginScreen