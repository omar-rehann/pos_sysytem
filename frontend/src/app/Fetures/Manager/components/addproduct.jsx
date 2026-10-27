"use client"
import { useState, useEffect } from "react"
import Swal from 'sweetalert2';
function Addproduct(){
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setprice] = useState('');
  const [allcategory, setallcategorey] = useState([]);
  const [selectedcategoret,setselected]=useState('');
    const categoreyName = allcategory.find(s => String(s._id) === String(selectedcategoret))?.name;
   // show categorey
    const getcategorey = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posystem/project/showcategorey`
        );
        const result = await response.json();
        if (result.success) {
          setallcategorey(result.data);
        
        } else {
          setallcategorey([]);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
   // Add Category
    const addproduct = async (e) => {
      e.preventDefault();
  
      // ========== Validation ==========
      if (!name.trim()) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "Name is required",
        });
      }
      if (!image) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "Image is required",
        });
      }
      if (!price) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please select a price",
        });
      }
       
      // ================================
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("categorey", categoreyName);

  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/addproduct`, {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          setName('');
          setprice('');
          setImage(null);
          // reset file input
          const fileInput = document.querySelector('input[type="file"]');          if (fileInput) fileInput.value = '';
  
          Swal.fire({
            icon: "success",
            title: "Product Added Successfully!",
            text: result.message || "The category has been added successfully.",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Add Product Failed",
            text: result.message || "Something went wrong!",
            confirmButtonText: "Try Again",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Server error, please try again later",
        });
      }
    };
     useEffect(()=>{
      getcategorey();
    },[]);
    return(
        <>
        <div className="product">
             <div className="container mt-5 p-2 m-2 me-5 px-6 mb-12">
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5">
          Add Product
        </h3>

        <div className="relative w-[90%] h-1 bg-gray-100 rounded-full">
          <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
        </div>
      </div>
      <div className="content">
          <form onSubmit={addproduct}  className="content bg-white shadow-md rounded-xl p-5 m-2 space-y-4">
        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e)=>setImage(e.target.files[0])}
          className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer
            file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white
            file:cursor-pointer hover:file:bg-blue-600"
        />

        {/* Name */}
        <input
        onChange={(e)=>setName(e.target.value)}
          className="block w-full p-3 px-4 text-sm text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter Product Name"
          value={name}
        />
         {/* Price */}
        <input
        onChange={(e)=>setprice(e.target.value)}
          className="block w-full p-3 px-4 text-sm text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter Price Product "
          value={price}
        />
        {/* categorey */}
     <select
  className="w-full bg-gray-200 p-2 rounded"
  value={selectedcategoret}
  onChange={(e) => setselected(e.target.value)}
>
  <option value="" disabled>
    Select Category
  </option>
  {allcategory.map((cat) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}
</select>
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white
            font-medium py-2 rounded-lg transition-colors"
        >
          Add Product
        </button>
      </form>
      </div>
        </div>
        </>
    )
}
export default Addproduct