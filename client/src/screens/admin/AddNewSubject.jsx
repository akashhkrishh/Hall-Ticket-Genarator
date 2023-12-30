import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiHelper } from '../../utils/utils';

function AddNewSubject() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title:"",
        code:"",
        date:null,
        time:null,
    });
    const options = ['10.00 AM - 01.00 PM','01.30 PM - 04.30 PM'];
    const handleChange = (e) =>{
        const { name, value } = e.target;
        setForm((prevData)=>({
          ...prevData,
          [name]:value,
        }));
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = {
            code:form.code.toUpperCase(),
            title: form.title.trim(),
            date:form.date,
            time:form.time,
        }

        apiHelper.post("/api/subject/add",data).then((res)=>{
            console.log(res.data);
            navigate("/addstudent")
        }).catch((err)=>alert(err.response.data))
        
        console.log(form)
    }
    

  return (
   <>
   
   <form onSubmit={handleSubmit}  className="flex min-h-[90vh] gap-5 justify-center items-center w-full pl-40 pr-40">
        <div className="flex min-w-[400px] flex-col h-[600px] gap-5 p-4 rounded-md border-2 w-[40%]">
            <h1 className='w-full text-xl font-semibold text-center'>Add New Subject</h1>
            <div className="flex flex-col gap-2 font-semibold w-full">
                <label htmlFor="scode" className=''>Subject Code</label>
                <input type="text"  className='text-center input' name="code" id="scode" autoComplete='off' onChange={handleChange} required/>
            </div>
            <div className="flex flex-col gap-2 font-semibold w-full">
                <label htmlFor="stitle" className=''>Subject Title</label>
                <input type="text"  className='text-center input' name="title" id="stitle" autoComplete='off' onChange={handleChange} required />
            </div>
            <div className="flex flex-col gap-2 font-semibold w-full">
                <label htmlFor="sdate" className=''>Exam Date</label>
                <input type="date"  className='text-center input' name="date" id="sdate" autoComplete='off' onChange={handleChange} required />
            </div>
            <div className="flex flex-col gap-2 font-semibold w-full">
                <label htmlFor="stime" >{"Exam Time "}</label>
                <select id="stime" name='time' onChange={handleChange} className='input p-3 text-center' required>
                <option value="">Select...</option>
                    {options.map((option, index) => (
                    <option className='p-3' key={index} value={option}>
                        {option}
                    </option>
                    ))}
                </select>
            </div>
            <button className='button'>Add Subject</button>
        </div>
        
   </form>
   </>
  )
}

export default AddNewSubject