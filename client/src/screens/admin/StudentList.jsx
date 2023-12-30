import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/utils';
import StudentCard from '../../components/StudentCard';

function StudentList() {
    const [StudentData,setStudent] = useState([]);
    const fetchdata = () =>{
        apiHelper.get("/api/student/Students",).then((res)=>{
            setStudent(res.data)
        }).catch((err)=>alert(err.response.data))
    }
    useEffect(()=>{
       fetchdata();

    },[]);

    
    
    if(StudentData.length == 0)
    return <h1>Wait</h1>
  return (
    <>
    <div className="flex  w-full pl-40 pr-40 min-h-[80vh]">
 
        <div className="flex flex-col w-full">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
                <table
                className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Reg No
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Image
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Name
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Date of Birth
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Course
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        College
                    </th>
                    <th scope="col" className="px-6 py-4">Edit</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {
                        StudentData.map((items,i)=>{
                            return(
                               
                                <StudentCard fetchdata={fetchdata} items={items} i={i} key={items._id}/>
                            )
                        })
                    }
                    
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>

    </div>
    
    </>
  )
}

export default StudentList