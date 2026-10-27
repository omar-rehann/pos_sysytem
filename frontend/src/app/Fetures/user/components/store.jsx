"use client"
import { useState, useEffect } from "react"
import Link from "next/link";

function Store() {
  const [allstore, setstore] = useState([]);

  // show store
  const getstore = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posystem/project/showstore`
      );
      const result = await response.json();

      if (result.success) {
        setstore(result.data);
      } else {
        setstore([]);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
      setstore([]);
    }
  };

  useEffect(() => {
    getstore();
  }, []);

  return (
    <>
      <div className="store p-5">
        <div className="container mt-5 p-2 m-2 px-6 mb-12">
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5">
            All You Store
          </h3>

          <div className="relative w-[90%] h-1 bg-gray-100 rounded-full">
            <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
          </div>
        </div>

        <div className="content grid md:grid-cols-3 gap-4">
          
          {allstore.map((e) => (
            <Link Link key={e._id} href={`/Fetures/user/categorey/${e.name}`}  className="!no-underline">
              <div
              key={e._id || e.id}
              className="box bg-white shadow-md hover:shadow-lg p-5 m-2 rounded-xl text-center cursor-pointer hover:pt-2 transition-all duration-300 ease-in-out"
            >
              <img
                src={e.img}
                alt={e.name}
                className="w-30 h-30 object-cover mx-auto rounded-full mb-3"
              />
              <h3 className="font-semibold text-gray-800 mt-2">{e.name}</h3>
            </div>
            </Link>
      
          ))}
        </div>
      </div>
    </>
  );
}

export default Store