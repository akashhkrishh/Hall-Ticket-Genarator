import { MdDelete } from "react-icons/md";
import ReactModal from "react-modal";
import { reverseDate } from "../utils/validation";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { apiHelper } from "../utils/utils";

function SubjectCard({items,i}) {
    const [isOpen,setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    const navigate = useNavigate();

    const handleDelete = () =>{
        apiHelper.delete(`/api/subject/${items._id}`,).then((res)=>{
            navigate("/addstudent")
            alert(res.data)
        }).catch((err)=>alert(err.response.data))

    }
  return (
    <>
    <tr className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">{i+1}</td>
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">{items.code}</td>
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">{items.title}</td>
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">{reverseDate(items.date)}</td>
        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">{items.time}</td>
        <td className="whitespace-nowrap px-6 py-4 hover:text-red-50"><button onClick={openModal}><MdDelete size={20} color="red"/></button></td>
    </tr>
    <ReactModal isOpen={isOpen} style={{
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 9
        },
        content: {
          width: '20%',
          height: '18%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }
    }}>
        <div className="flex h-[100%] justify-between flex-col w-full">
            <h1 className="w-full text-center" >{"Are you sure Delete this Subject?"}</h1>
            <div className="flex gap-4">
                <button onClick={handleDelete} className="bg-green-500 text-white rounded-md p-2 w-[50%] hover:bg-green-600">Yes</button>
                <button onClick={closeModal} className="bg-red-500 text-white rounded-md p-2 w-[50%] hover:bg-red-600">No</button>
            </div>

        </div>
    </ReactModal>
    </>
  )
}

export default SubjectCard