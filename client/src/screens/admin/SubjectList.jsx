import React, { useEffect, useState } from 'react'
import SubjectCard from '../../components/SubjectCard';
import { apiHelper } from '../../utils/utils';

function SubjectList() {
    const [SubjectData,setSubject] = useState([]);
    useEffect(()=>{
        apiHelper.get("/api/subject/subjects",).then((res)=>{
            setSubject(res.data)
        }).catch((err)=>alert(err.response.data))

    },[]);
    if(SubjectData.length == 0)
    return <h1>Wait</h1>
  return (
    <>
    <div className="flex items-center w-full pl-40 pr-40 min-h-[80vh]">
 
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
                        #
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Subject Code
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Subject Title
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Exam - Date
                    </th>
                    <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Exam - Time
                    </th>
                    <th scope="col" className="px-6 py-4">Edit</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {
                        SubjectData.map((items,i)=>{
                            return(
                                <SubjectCard items={items} i={i} key={items._id}/>
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

export default SubjectList