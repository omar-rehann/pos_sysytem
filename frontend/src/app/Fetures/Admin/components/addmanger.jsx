"use client"
import { useState,useEffect } from "react"
import Swal from 'sweetalert2';


function Addmanger(){
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [adress,setadress]=useState('');
    const [store,setstore]=useState('');
    const [number,setnumber]=useState('');
    const [image,setimage]=useState(null); 
    // show store
    const [allstore,setstoree]=useState([]);
//  show store
    const getstore = async () => {
      try {
        const response = await fetch(
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/showstore`)
        );
    
        const result = await response.json();
    
        if (result.success) {
         setstoree(result.data);
          
          await getstore()
        } else {
          setstoree([]);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    useEffect(()=>{
      getstore()
    },[]);
      // add manger
    const addmanger = async (e) => {
      e.preventDefault();
      const formData = new FormData();
        
formData.append("image", image);
formData.append("name", name);
formData.append("email", email);
formData.append("password", password);
formData.append("number", number);
formData.append("adress", adress);
formData.append("store", store);
       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/addmanger`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if(result.success){
        setname('');
        setemail('');
        setadress('');
        setpassword('');
        setstore('');
        setnumber('');
        setimage('');
         Swal.fire({
      icon: "success",
      title: "Manger Added Successfully!",
      text: result.message || "The store has been added successfully.",
      confirmButtonText: "OK",
    });
      }else{
        Swal.fire({
        icon: "error",
        title: "Add Manger Failed",
        text: result.message || "Invalid email or password!",
        confirmButtonText: "Try Again",
      });
      }
      console.log("response store", result);
      
    };
    return(
        <>
        <div className="categorey">
                    <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
    <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
      Add Manger
    </h3>

    <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
      <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
    </div>
  </div>
  <div className="content bg-white shadow-md rounded-xl p-5 m-2  space-y-4">
  <h3 className="text-lg font-bold text-gray-800">Add Manager</h3>
 <input
    type="file"
    className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer
      file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white
      file:cursor-pointer hover:file:bg-blue-600"
      onChange={(e) => setimage(e.target.files?.[0] )}
  />
  <input
    type="text"
    placeholder="Enter Name"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e)=>setname(e.target.value)}
  />

  <input
    type="email"
    placeholder="Enter Email"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e)=>setemail(e.target.value)}
  />

  <input
    type="password"
    placeholder="Enter Password"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e)=>setpassword(e.target.value)}
  />

  <input
    type="number"
    placeholder="Enter Number"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e)=>setnumber(e.target.value)}
  />

  <input
    type="text"
    placeholder="Enter Address"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e)=>setadress(e.target.value)}
  />

  <select
  value={store}
  onChange={(e) => setstore(e.target.value)}
  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white
    focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="" disabled>
    Select Store
  </option>

  {allstore.map((item) => (
    <option key={item._id} value={item._id}>
      {item.name}
    </option>
  ))}
</select>



 

  <button
  onClick={addmanger}
    className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white
      font-medium py-2 rounded-lg transition-colors"
  >
    Add Manager
  </button>
</div>

        </div>
        </>
    )
}
export default Addmanger