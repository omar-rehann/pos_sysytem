"use client"


import { useState ,useEffect} from "react"

function  Service(){
      const [allservices,setservices]=useState([]);

  //  show services
    const getservices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posystem/project/showservices`
        );
    
        const result = await response.json();
    
        if (result.success) {
          setservices(result.data);
                 } else {
          setservices([]);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    
  
    useEffect(()=>{
getservices()
    },[])
    
      return(
        
        <>
        <div className="services  mt-5 p-5">
    <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
    <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
      Services 
    </h3>

    <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
      <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
    </div>
  </div>
  <div className="content  bg-white shadow-md rounded-lg m-5 p-5 space-y-4">
       <div className="content  bg-white shadow-md rounded-lg m-5 p-5 space-y-4">
        <div className="m-5 p-5 bg-gray-50 rounded-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Our Services</h2>
        <span className="text-sm text-gray-500">
          {allservices.length} {allservices.length === 1 ? "service" : "services"}
        </span>
      </div>
      {allservices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allservices.slice(0,6).map((ser, index) => (
            <div
              key={ser._id}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >              <span className="absolute top-4 right-4 text-xs font-semibold text-gray-400 bg-gray-100 rounded-full px-2.5 py-1">
                #{index + 1}
              </span>
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600
                           group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300"
              >
                <i className={`fa-solid ${ser.icon || "fa-briefcase"} text-xl`}></i>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-800 line-clamp-1">
                {ser.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
                {ser.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <i className="fa-solid fa-briefcase text-5xl mb-3 opacity-50"></i>
          <p className="text-lg font-medium">No services found</p>
        </div>
      )}
    </div>

    </div>

    </div>



        </div>
        </>
    )
}
export default Service