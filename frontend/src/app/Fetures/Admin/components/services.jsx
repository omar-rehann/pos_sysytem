"use client"
import { useState } from "react"
import Swal from 'sweetalert2';

function Services(){
    const [name,setname]=useState('');
  const [description,setdescription]=useState('');
  const data={
    name:name,
    description:description
  }
  const addservices = async (e) => {
    e.preventDefault();        
     const response = await fetch("http://localhost:4000/posystem/project/addservices", {
      method: "POST",
       headers: {
    "Content-Type": "application/json",
  },
      body:  JSON.stringify(data),
    });
    const result = await response.json();
    if(result.success){
      setname('');
      setdescription('');
       Swal.fire({
    icon: "success",
    title: "Services Added Successfully!",
    text: result.message || "The store has been added successfully.",
    confirmButtonText: "OK",
  });
    }else{
      Swal.fire({
      icon: "error",
      title: "Add Services Failed",
      text: result.message || "Invalid email or password!",
      confirmButtonText: "Try Again",
    });
    }
    console.log("response store", result);
    
  };
   
    return(
        <>
        <div className="services">
                       <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
    <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
      Add Services
    </h3>

    <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
      <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
    </div>
  </div>
  <div className="content">
    <div className="box bg-white shadow-md rounded-lg m-5 p-5 space-y-4">
  <input
  onChange={(e)=>setname(e.target.value)}
    type="text"
    value={name}
    placeholder="Name Services"
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <textarea
  onChange={(e)=>setdescription(e.target.value)}
    placeholder="Description"
    value={description}
    rows={4}
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  ></textarea>
  <button onClick={addservices} className="bg-blue-700 p-2 rounded w-full cursor-pointer text-white hover:bg-blue-600">Sumbit</button>

</div>
  </div>
  
        </div>
        </>
    )
}
export default Services