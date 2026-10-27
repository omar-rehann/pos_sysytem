"use client"
import Swal from 'sweetalert2';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState,useEffect } from "react"
function User(){
  const [users,setalluser]=useState([]);
  const getuser=async()=>{
    try{
       let response=await fetch("http://localhost:4000/possysytem/userAuth/showuser");
    let result=await response.json();
    console.log("raw categories:", result);
    if(result.success){
      setalluser(result.user)
    }
    }catch (error) {
      console.error("Error fetching categories:", error);
      setalluser([]);
    }
  };
useEffect(()=>{
  
  getuser()
},[])
// delete user
const deleteuser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/possysytem/userAuth/deleteuser/${id}`,
        { method: "DELETE" }
      );
      let data = await response.json();
      if (data.success) {
 setalluser((prev) =>
  prev.filter((e) => String(e._id) !== String(id))
);
   
      }
    } catch (error) {
      console.log(error);
    }
  };
// confirm message
const confirmDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this store? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    await deleteuser(id);
  }
};

    return(
        <>
        <div className="user">
                          <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
    <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
      Show User
    </h3>

    <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
      <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
    </div>
  </div>
  <div className="user bg-white shadow-md   rounded m-5">
 <Table>
      <TableHeader className="text-center">
        <TableRow>
          <TableHead className=" text-center">id</TableHead>
                    <TableHead className=" text-center">Img</TableHead>

          <TableHead className=" text-center">Name User</TableHead>
        <TableHead className=" text-center">Email</TableHead>
          <TableHead className=" text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" text-center">
        {users.map((e,i)=>{
          return(
            <>
            <TableRow className="text-center mx-auto">
              <TableCell className="font-medium">{i}</TableCell>
                    <TableCell className="font-medium text-center ">
                      <div className="image  text-center p-2">
                                              <img src="https://elzerowebschool.github.io/HTML_And_CSS_Template_Three/imgs/avatar-05.png" className='  mx-auto  w-15 h-15 rounded-full' alt="" />

                      </div>
                      </TableCell>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell className="font-medium">{e.email}</TableCell>
                    <TableCell className="font-medium">
                      <button onClick={()=>confirmDelete(e._id)} className="  cursor-pointer  p-2 bg-red-600 rounded text-white"> <i className="fa-solid fa-trash text-white ms-2 me-2"></i>Delete </button>
                    </TableCell>


            </TableRow>
                    


            </>
          )
        })}
        
       
      </TableBody>
      
    </Table>
</div>
        </div>
        </>
    )
}
export default User