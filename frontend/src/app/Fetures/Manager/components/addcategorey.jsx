"use client"
import { useState, useEffect } from "react"
import Swal from 'sweetalert2';
function AddCategory() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [store, setStore] = useState('');
  const [allStores, setAllStores] = useState([]);

  // Add Category
  const addCategory = async (e) => {
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
    if (!store) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a store",
      });
    }
    // ================================

const storeName = allStores.find(s => String(s._id) === String(store))?.name;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("store", storeName);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/addcategorey`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setName('');
        setImage(null);
        setStore('');
        // reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';

        Swal.fire({
          icon: "success",
          title: "Category Added Successfully!",
          text: result.message || "The category has been added successfully.",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Add Category Failed",
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

  // Get Stores
  const getStores = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/showstore`);
      const result = await response.json();

      if (result.success) {
        setAllStores(result.data);
      } else {
        setAllStores([]);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div className="categorey">
      <div className="container mt-5 p-2 m-2 me-5 px-6 mb-12">
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5">
          Add Category
        </h3>

        <div className="relative w-[90%] h-1 bg-gray-100 rounded-full">
          <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
        </div>
      </div>

      <form onSubmit={addCategory} className="content bg-white shadow-md rounded-xl p-5 m-2 space-y-4">
        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer
            file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white
            file:cursor-pointer hover:file:bg-blue-600"
        />

        {/* Name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-3 px-4 text-sm text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter Category Name"
        />

        {/* Store Select */}
        <select
          value={store}
          onChange={(e) => setStore(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select Store
          </option>
          {allStores.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white
            font-medium py-2 rounded-lg transition-colors"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
export default AddCategory;