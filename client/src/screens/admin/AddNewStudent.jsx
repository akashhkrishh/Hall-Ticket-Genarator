import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/utils';
import {UploadImg} from "../../assets/images/index"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddNewStudent() {
    const [SubjectData,setSubject] = useState([]);
    const nav = useNavigate();

    const [form,setForm] = useState({

        name:"",
        image:null,
        regno: "",
        college: "",
        course:"",
        centrecode:"",
        semester:"",
        dob:"",
        subjects:[],
    });

    const handleSChange = (e) =>{
        const { name, value, type } = e.target;
        setForm((prevData) => ({
          ...prevData,
          [name]: type === 'file' ? e.target.files[0] : value,
            
        }));
      
      }


    useEffect(()=>{
        apiHelper.get("/api/subject/subjectcode",).then((res)=>{
            setSubject(res.data)
        }).catch((err)=>alert(err.response.data))

    },[]);
   
    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        setForm((prevData) => ({
          ...prevData,
          subjects: prevData.subjects.includes(value)
            ? prevData.subjects.filter((checkbox) => checkbox !== value)
            : [...prevData.subjects, value],
        }));
      };
    
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(form.image == null){
            return toast.error("Image Required !")
        }
          

    try{
      const dform = new FormData();
      dform.append('name', form.name);
      dform.append('image', form.image);
      dform.append('regno',form.regno);
      dform.append('course', form.course);
      dform.append('centrecode', form.centrecode);
      dform.append('college', form.college);
      dform.append('semester', form.semester);
      dform.append('subjects', form.subjects);
      dform.append('dob', form.dob);
        
      apiHelper.post('/api/student/add', dform, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response=>{
         toast.success('Account Created successfully!');
         nav("/studentlist")
      })
    } catch (error) {
      toast.error(error.response.data);  
    }

    }

  return (
   <>
   
   <div className="flex min-h-[90vh] gap-5 justify-center items-center w-full pl-40 pr-40">
    
        <form onSubmit={handleSubmit}  className="flex h-[600px] gap-2 flex-col p-4 rounded-md border-2 w-[60%]">
            <h1 className='w-full text-xl mb-5  font-semibold text-center'>Add New Student</h1>
            <div className="flex w-full flex-col gap-2  h-[95%]">
                <div className="flex gap-5 h-[40%] ">
                    <label htmlFor='image' className="cursor-pointer flex justify-center items-center w-[30%]">
                        <img src={form.image == null ? UploadImg :URL.createObjectURL(form.image)} className='rounded-md border-2' style={{width:"100%"}} alt="" />
                        <input type="file" id="image" autoComplete='off' required onChange={handleSChange} name='image' hidden />
                    </label>
                    <div className="flex flex-col gap-5 h-[100%] justify-between w-[70%] ">
                        <div className="flex gap-2 flex-col">
                            <label htmlFor="name">{"Student Name"}</label>
                            <input type="text" className='input'  autoComplete='off'  onChange={handleSChange} name="name" id="name" required/>
                        </div>
                        <div className="flex mb-2 gap-2 flex-col">
                            <label htmlFor="regno">{"Student Registration Number"}</label>
                            <input type="number"  autoComplete='off' required onChange={handleSChange} className='input' name="regno" id="regno" />
                        </div>
                       

                    </div>
                </div>
                <div className="flex justify-between  h-[50%] w-full gap-4">
                    <div className="flex flex-col gap-2 h-[100%] w-[50%]">
                        <div className="flex mb-2 gap-2 flex-col">
                            <label htmlFor="semester">{"Semester"}</label>
                            <input type="number"  autoComplete='off' required onChange={handleSChange} className='input' name="semester" id="semester" />
                        </div>
                        <div className="flex mb-2 gap-2 flex-col">
                            <label htmlFor="college">{"College Name"}</label>
                            <input type="text"  autoComplete='off' required onChange={handleSChange} className='input' name="college" id="college" />
                        </div>
                        <div className="flex mb-2 gap-2 flex-col">
                            <label htmlFor="dob">{"Date of Birth"}</label>
                            <input type="date"  autoComplete='off' required onChange={handleSChange} className='input' name="dob" id="dob" />
                        </div>

                    </div>
                    <div className="flex flex-col gap-2 h-[100%] w-[50%]">
                        <div className="flex mb-2 gap-2 flex-col">
                            <label htmlFor="course">{"Course Name"}</label>
                            <input type="text"  autoComplete='off' required onChange={handleSChange} className='input' name="course" id="course" />
                        </div>
                        <div className="flex mb-2 gap-2 flex-col">
                            <label htmlFor="centrecode">{"Centre Code"}</label>
                            <input type="number"  autoComplete='off' required onChange={handleSChange} className='input' name="centrecode" id="centrecode" />
                        </div>
                        <div className="flex mb-2 justify-center  gap-2 flex-col">
                            <button onClick={handleSubmit} className='mt-8 button'>Add Student</button>
                        </div>
                        
                        
                    </div>
                    
                </div>
                

            </div>
        </form>
        <div className="flex flex-col gap-5 h-[600px] p-4 rounded-md border-2 w-[40%]">
            <h1 className='w-full text-xl  font-semibold text-center'>Subject List</h1>
            <div className="grid grid-cols-1">
            {
                SubjectData.map((items)=>{
                    return(
                        <div key={items._id} className='flex gap-2 mb-2 font-semibold'>
                            <input
            type="checkbox"
            name={items.code} 
            value={items.code} 
            checked={form.subjects.includes(items.code)}
            onChange={handleCheckboxChange}
          />
                            
                        <label htmlFor={items.code}>{items.code +" - "}<span className='font-normal'>{items.title}</span></label>
                       
                        </div>
                    )
                })
            }
            </div>
        
        

        </div>
   </div>
   </>
  )
}

export default AddNewStudent