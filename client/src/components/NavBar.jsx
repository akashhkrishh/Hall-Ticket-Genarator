import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar() {
    const nav = useNavigate();
    const navlist = [
        {
            navLink: "/dashboard",
            navTitle: "Home"
        },
        {
            navLink: "/studentlist",
            navTitle: "Student List"
        },
        
        {
            navLink: "/addstudent",
            navTitle: "Add Student"
        },
        {
            navLink: "/subjectlist",
            navTitle: "Subject List"
        },
        {
            navLink: "/addsubject",
            navTitle: "Add Subject"
        },
    ]
  return (
    <>
    <div className="flex fixed justify-center items-center gap-5 text-md text-gray-200 w-full h-[10vh] bg-main">
        {
            navlist.map((items)=>{
                return(
                    <NavLink key={items.navLink} className={"hover:scale-105"} to={items.navLink}>{items.navTitle}</NavLink>
                );
            })
        }
        <button onClick={()=>{
            localStorage.removeItem("htoken");
            nav("/admin")
            
        }} className='p-2 rounded-md pl-4 pr-4 bg-orange-600'>Logout</button>

    </div>
    </>
  )
}

export default NavBar