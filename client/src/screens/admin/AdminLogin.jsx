import { useState } from "react";
import { AdminImg, } from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { apiHelper } from "../../utils/utils";


function LoginScreen() {
    const [email,setEmail] = useState();
    const [pass,setPass] = useState();
    const nav = useNavigate();
    const handleClick = async(e) =>{
        e.preventDefault();
        apiHelper.post("/api/admin/login",{
            email: email,
            pass: pass,
        }).then((res)=>{
            localStorage.setItem("htoken",res.data);
            nav("/dashboard");
        }).catch((err)=>alert(err.response.data));
        
    }
   return (
    <form onSubmit={handleClick} className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
        <div className="bg-main flex gap-5 flex-col p-4 rounded-md shadow-xl w-full overflow-hidden" style={{maxWidth:"400px",minHeight:"400px"}}>
            <h1 className="w-full text-xl font-semibold text-white text-center">{"Admin Login Page"}</h1>
            <img src={AdminImg} className="w-full rounded-md " alt="" />
            <div className="flex gap-2 flex-col">
                <label className="text-white"  htmlFor="email">{"Email Address"}</label>
                <input className="input text-center" 
                autoComplete="off" onChange={(e)=>setEmail(e.target.value)} id="email" type="email" required/>

            </div>
            <div className="flex gap-2 flex-col">
                <label className="text-white"  htmlFor="pass">{"Password"}</label>
                <input className="input text-center"
                autoComplete="off" onChange={(e)=>setPass(e.target.value)}  id="pass" type="password" required/>
            </div>
            <div className="flex gap-2 flex-col">
                <button className="button">{"Login"}</button>
            </div>
        </div>
    </form>
  )
}

export default LoginScreen