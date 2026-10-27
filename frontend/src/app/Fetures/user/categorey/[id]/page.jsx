"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Store from "../../components/store";
import Link from "next/link";
import Sidebar from "../../components/layot";

function Categoreyname(){
      const { id } = useParams();
const name = decodeURIComponent(id);
const [stores, setStores] = useState([]);
    useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await fetch(
           `${process.env.NEXT_PUBLIC_API_URL}/posystem/project/showcategorey`
        );
        const result = await response.json();
        if (result.success) {
           const filter=result.data.filter((e)=>e.store===name);
           setStores(filter);
        }else{
            setStores([])
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCategory();
  
  }, [name]);

    return(
        <>
        <Sidebar>
            <div className="details flex flex-col gap-6 p-5">
  {/* start Store */}
  <Store />

  <hr className="border-gray-200 my-4 w-full" />

  {/* start Categorey */}
  <div className="categorey w-full">
    <div className="container mt-5 p-2 m-2 px-6 mb-12">
      <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5">
        All Categorey
      </h3>

      <div className="relative w-[90%] h-1 bg-gray-100 rounded-full">
        <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
      </div>
    </div>

    <div className="content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {stores.map((e) => (
        <Link href={`/Fetures/user/product/${e.name}`}>
        <div
          key={e._id}
          className="box bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl text-center"
        >
          <img
            src={e.img}
            alt={e.name}
            className="w-28 h-28 object-cover mx-auto rounded-full mb-3"
          />
          <h3 className="font-semibold text-gray-800">{e.name}</h3>
        </div>
        </Link>
        
      ))}
    </div>
  </div>
</div>

        </Sidebar>
     
        </>
    )
    
}
export default Categoreyname