"use client"
import { useState } from "react"
import Swal from 'sweetalert2';


function Addstore(){
  const [name,setname]=useState('');
  const [image,setimage]=useState(null); 
  // add store
const addstore = async (e) => {
  e.preventDefault();
  const formData = new FormData();
    formData.append("image", image);  
    formData.append("name", name);         
   const response = await fetch("http://localhost:4000/posystem/project/addstore", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  if(result.success){
    setname('');
    setimage('');
     Swal.fire({
  icon: "success",
  title: "Store Added Successfully!",
  text: result.message || "The store has been added successfully.",
  confirmButtonText: "OK",
});
  }else{
    Swal.fire({
    icon: "error",
    title: "Add Store Failed",
    text: result.message || "Invalid email or password!",
    confirmButtonText: "Try Again",
  });
  }
  
};

    return(
        <>
        <div className="addstore">
                <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
    <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
      Add Store
    </h3>

    <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
      <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
    </div>
  </div>
  {/* add store */}
  <div className="content bg-white shadow-md rounded-xl p-5 m-2  space-y-4">
  <input
onChange={(e) => setimage(e.target.files[0])}  
  type="file"
    className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer
      file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white
      file:cursor-pointer hover:file:bg-blue-600"
  />
  <input
  onChange={(e)=>setname(e.target.value)}
  value={name}
    type="text"
    placeholder="ENTER name store"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
  onClick={addstore}
    className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white
      font-medium py-2 rounded-lg transition-colors"
  >
    Add store
  </button>
</div>

        </div>
        </>
    )
}
export default Addstore