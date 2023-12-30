import React, { useEffect, useRef, useState } from 'react'
import { apiHelper } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { reverseDate } from '../utils/validation';
import { useReactToPrint,} from 'react-to-print';

function Hallticket() {

  var reg = localStorage.getItem('reg');
  const [data, setData] = useState([]);
  const [subjectlist, setSubject] = useState([]);
  const [fsubject,setf] = useState([]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  useEffect(()=>{
    fetchData();
  },[])
  
  const fetchData = () =>{
    apiHelper.get(`/api/open/route/${reg}`).then((res)=>{
        console.log(res.data)
        setData(res.data)}).catch((err)=>{
        console.log(err)
        window.nav("/");
    });
    apiHelper.get(`/api/open/subjects`).then((res)=>{
        setSubject(res.data);
        
    }).catch((err)=>{
        console.log(err.response.data)
    })
  }

    if(subjectlist.length != 0 && fsubject.length == 0){
        const dta = subjectlist.filter(subject => data.subjects.includes(subject.code));
        setf(dta);
    }



  if(data.length == 0)
  return <h1>Hell</h1>
  
  return (
    <div className="flex gap-5 justify-between flex-col w-full min-h-[100vh]">
        <div className="flex gap-5 bg-white fixed w-full flex-col">
        <div className="flex justify-center items-center w-full h-[10vh] bg-main">
            <h1 className='text-white font-semibold'>Download Your Hallticket</h1>
        </div>
        <div className="flex justify-between pr-44 bg-white text-white pl-44 mb-3 items-center w-full">
            <button className='p-2 pl-4 pr-4 bg-main rounded-md'>Goback</button>
            <button onClick={handlePrint} className='p-2 pl-4 pr-4 bg-main rounded-md'>Download</button>
        </div>
        </div>
        <div className="flex h-[20vh]"></div>
        <div className="flex w-full pl-44  pr-44  h-[28vh]">
            <div className="flex  h-[100%] w-[85%]">
            <div className="flex h-[100%] justify-between flex-col w-[30%]">
                    <p className='text-lg'>Name</p>
                    <p className='text-lg'>Registration Number</p>
                    <p className='text-lg'>Course</p>
                    <p className='text-lg'>Semester</p>
                    <p className='text-lg'>College</p>
                    <p className='text-lg'>Centre Code</p>
                </div>
                <div className="flex h-[100%] font-semibold justify-between flex-col w-[70%]">
                    <p className='text-lg'>{": "+data.name}</p>
                    <p className='text-lg'>{": "+data.regno}</p>
                    <p className='text-lg'>{": "+data.course}</p>
                    <p className='text-lg'>{": "+data.semester}</p>
                    <p className='text-lg'>{": "+data.college}</p>
                    <p className='text-lg'>{": "+data.centrecode}</p>
                </div>
            </div>
            <div className="flex w-[15%] ">
                <img className='rounded-md' src={data?.image.file_data} alt=""   />
            </div>
        </div>
        <div className="flex w-full pl-44  pr-44 ">
        <table
                className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        #
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Code
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Title
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Date
                    </th>
                    
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Time
                    </th>
                    
                    
                    </tr>
                </thead>
                <tbody>
                    {
                        fsubject.map((items,i)=>{
                            return(
                            <tr key={i} className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">{i+1}</td>
                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">{items.code}</td>
                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">{items.title}</td>
                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">{reverseDate(items.date)}</td>
                                <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">{items.time}</td>
                                
                            </tr>
                            )
                        })
                    }
                    
                </tbody>
        </table>
        {console.log(fsubject)}
        
        </div>
        <div className="flex justify-center items-center w-full h-[10vh] bg-main">
            <h1 className='text-white font-semibold'>Support@example.com</h1>
        </div>
        
        <div style={{display:"none"}}>
            <div ref={componentRef}>
                Heie
            </div>
        </div>

    </div>
  )
}

export default Hallticket