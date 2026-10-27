"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Swal from "sweetalert2";
import Sidebar from "../../components/layot";
function Allproduct(){
const { id } = useParams();
const name = decodeURIComponent(id);
const [allproduct,setproduct]=useState([]);
  const [quantities, setQuantities] = useState({});
 const addorder = async (pro) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?._id) {
      return Swal.fire({ icon: "warning", title: "Please log in first" });
    }

    const quantity = quantities[pro._id] ?? 1;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/addorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          img: pro.img,
          name: pro.name,
          price: pro.price,
          categorey: pro.categorey,
          quantity,
        }),
      });
      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Added to cart!",
          timer: 1200,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Add Product Failed",
          text: result.message || "Something went wrong!",
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
   useEffect(() => {
    const getproduct = async () => {
      try {
        const response = await fetch(
           `${process.env.NEXT_PUBLIC_API_URL}/posystem/project/showproduct`
        );
        const result = await response.json();
        if (result.success) {
           const filter=result.products.filter((e)=>e.categorey===name);
           setproduct(filter);
        }else{
            setproduct([])
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getproduct();
  }, [name]);
  

    return(
        <>
        <div className="popular">
          <Sidebar>
            <div className="container mt-5 p-2 m-2 me-5 px-6 mb-12">
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5">
          All  Product By Categorey
        </h3>
        <div className="relative w-[90%] h-1 bg-gray-100 rounded-full">
          <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {allproduct.length > 0 ? (
          allproduct.map((pro, index) => (
            <div
              key={pro._id}
              className="box relative bg-white shadow-md hover:shadow-lg transition p-5 rounded-xl"
            >
              <span className="absolute top-3 right-3 z-10 text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-2.5 py-1">
                #{index + 1}
              </span>

              <div className="image mb-2">
                <img className="rounded w-full h-48 object-cover" src={pro.img} alt={pro.name} />
              </div>

              <div className="information mt-2 mb-1 flex flex-col">
                <h3 className="name mb-2 font-semibold">
                  <i className="fa-solid fa-utensils me-2"></i>
                  Name Product : {pro.name}
                </h3>
                <p className="category">
                  <i className="fa-solid fa-folder me-2"></i>
                  categorey : {pro.categorey}
                </p>
                <p className="price mt-2">
                  <i className="fa-solid fa-tag me-2"></i>
                  Price : ${pro.price}
                </p>
              </div>
              <hr />

              <div className="quantity flex justify-between items-center mt-4">
           
                <button
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [pro._id]: Math.max(1, (prev[pro._id] ?? 1) - 1),
                    }))
                  }
                  className="bg-black cursor-pointer hover:bg-gray-800 transition w-10 p-2 rounded text-white"
                >
                  -
                </button>

                <div className="font-bold">{quantities[pro._id] ?? 1}</div>

                <button
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [pro._id]: (prev[pro._id] ?? 1) + 1,
                    }))
                  }
                  className="bg-red-600 cursor-pointer hover:bg-red-700 transition w-10 p-2 rounded text-white"
                >
                  +
                </button>
              </div>

              <div className="buy flex justify-end mt-4">
                <button
                  onClick={() => addorder(pro)}
                  className="bg-blue-700 hover:bg-blue-600 transition-all duration-300 w-10 h-10 rounded text-white cursor-pointer flex items-center justify-center"
                  aria-label="Add to cart"
                  title="Add to cart"
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-400">
            <i className="fa-solid fa-box-open text-5xl mb-3 opacity-50"></i>
            <p className="text-lg font-medium">No products found</p>
          </div>
        )}
      </div>

          </Sidebar>
      
    </div>
        </>
    )
    
}
export default Allproduct