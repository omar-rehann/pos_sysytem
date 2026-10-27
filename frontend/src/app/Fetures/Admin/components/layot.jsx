"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Sidebar({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  // logout
const logout=()=>{
  localStorage.removeItem("logintoken");
}
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    if (window.matchMedia("(min-width: 992px)").matches) {
      setCollapsed((v) => !v);
    } else {
      setSidebarOpen((v) => !v);
    }
  };

  const hideWhenCollapsed = collapsed ? "md:hidden" : "";

  return (
    <div className="min-h-screen flex p-2 bg-gray-100" dir="ltr">
      <aside
         className={`fixed inset-y-0 left-0 z-40 w-64 overflow-hidden bg-white shadow-lg transform transition-all duration-300
    md:sticky md:top-0 md:h-screen ${
    collapsed ? "md:w-[68px]" : "md:w-64"
  } ${
    sidebarOpen
      ? "translate-x-0"
      : "-translate-x-full md:translate-x-0"
  }`}
      >

        <div className="h-[61px] px-4 border-b  text-center flex items-center justify-between">

          <h1
            className={`text-lg text-center font-bold text-gray-800 whitespace-nowrap ${hideWhenCollapsed}`}
          >
            
            Admin Panel
          </h1>
          <button
            onClick={toggleSidebar}
            className="w-9 h-9 md:hidden block  cursor-pointer flex items-center rounded-lg text-gray-700  hover:text-gray-900"
            aria-label="Toggle sidebar"
          >
            <i className="fa-solid fa-x" />
          </button>

         

        </div>

        <nav className="p-3 space-y-1">

          {/* ===== Dashboard ===== */}
          <Link href="/Fetures/Admin/Homepage"   className="!no-underline hover:!no-underline">
          <button
            title="homepage"
            onClick={() => setActiveItem("homepage")}
            className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              collapsed ? "md:justify-center" : ""
            } ${
              activeItem === "homepage"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-home w-5 text-center" />

              <span
                className={`whitespace-nowrap ${hideWhenCollapsed}`}
              >
                Home page
              </span>
            </div>
          </button>
          </Link>
          <Link href="/Fetures/Admin/Addstore" className="!no-underline hover:!no-underline">
          <button
            title="addstore"
            onClick={() => setActiveItem("addstore")}
            className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              collapsed ? "md:justify-center" : ""
            } ${
              activeItem === "addstore"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
<i className="fa-solid fa-store w-5 text-center" />
              <span
                className={`whitespace-nowrap ${hideWhenCollapsed}`}
              >
               Add store
              </span>
            </div>
          </button>
          </Link>
          <Link href="/Fetures/Admin/showstore" className="!no-underline hover:!no-underline">
          <button
            title="showstore"
            onClick={() => setActiveItem("showstore")}
            className={`  cursor-pointer  w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              collapsed ? "md:justify-center" : ""
            } ${
              activeItem === "showstore"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
<i className="fa-solid fa-store w-5 text-center" />
              <span
                className={`whitespace-nowrap ${hideWhenCollapsed}`}
              >
               Show  Store
              </span>
            </div>
          </button>
          </Link>
           <Link href="/Fetures/Admin/Addpopular" className="!no-underline hover:!no-underline">
          <button
            title="addpopular"
            onClick={() => setActiveItem("addpopular")}
            className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              collapsed ? "md:justify-center" : ""
            } ${
              activeItem === "addpopular"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
<i className="fa-solid fa-plus w-5 text-center" />
              <span
                className={`whitespace-nowrap ${hideWhenCollapsed}`}
              >
               Add Popular
              </span>
            </div>
          </button>
          </Link>
          <Link href="/Fetures/Admin/showpopular" className="!no-underline hover:!no-underline">
          <button
            title="popular"
            onClick={() => setActiveItem("popular")}
            className={`  cursor-pointer  w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              collapsed ? "md:justify-center" : ""
            } ${
              activeItem === "popular"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
<i className="fa-solid fa-box w-5 text-center" />              <span
                className={`whitespace-nowrap ${hideWhenCollapsed}`}
              >
               Show  Popular 
              </span>
            </div>
          </button>
          </Link>
         
           <Link href="/Fetures/Admin/servicespage" className="!no-underline hover:!no-underline">
           <button
            title="Addservices"
            onClick={() => setActiveItem("Addservices")}
            className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              collapsed ? "md:justify-center" : ""
            } ${
              activeItem === "Addservices"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
<i className="fa-solid fa-concierge-bell w-5 text-center" />
          <span
                className={`whitespace-nowrap ${hideWhenCollapsed}`}
              >
               Add Services
              </span>
            </div>
          </button>
          </Link>
          <Link href="/Fetures/Admin/showservices" className="!no-underline hover:!no-underline">
           <button
            title="showservices"
            onClick={() => setActiveItem("showservices")}
            className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              collapsed ? "md:justify-center" : ""
            } ${
              activeItem === "showservices"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
<i className="fa-solid fa-eye w-5 text-center" />
          <span
                className={`whitespace-nowrap ${hideWhenCollapsed}`}
              >
               Show Services
              </span>
            </div>
          </button>
          </Link>
          <Link href="/Fetures/Admin/Addmanger" className="!no-underline hover:!no-underline">
          <button
            title="addmanger"
            onClick={() => setActiveItem("addmanger")}
            className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              collapsed ? "md:justify-center" : ""
            } ${
              activeItem === "addmanger"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
                <i className="  fa-solid fa-user w-5 text-center"></i>

       
       <span
                className={`whitespace-nowrap ${hideWhenCollapsed}`}
              >
               Add Manger
              </span>
            </div>
          </button>
          </Link>
           <Link href="/Fetures/Admin/showmanger" className="!no-underline hover:!no-underline">
          <button
            title="showmanger"
            onClick={() => setActiveItem("showmanger")}
            className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              collapsed ? "md:justify-center" : ""
            } ${
              activeItem === "showmanger"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
          <i className="fa-solid fa-user-tie w-5 text-center"></i>

       
       <span
                className={`whitespace-nowrap ${hideWhenCollapsed}`}
              >
               Show Manger
              </span>
            </div>
          </button>
          </Link>
           <Link href="/Fetures/Admin/showuser" className="!no-underline hover:!no-underline">
                   <button
  title="showuser"
  onClick={() => setActiveItem("showuser")}
  className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    collapsed ? "md:justify-center" : ""
  } ${
    activeItem === "showuser"
      ? "bg-blue-500 text-white"
      : "text-gray-700 hover:bg-gray-100"
  }`}
>
  <div className="flex items-center gap-3">
    <i className="fa-solid fa-file-invoice w-5 text-center" />
    <span className={`whitespace-nowrap ${hideWhenCollapsed}`}>
      Show User
    </span>
  </div>
</button>
          </Link>
           <Link href="/Fetures/Admin/invoices " className="!no-underline hover:!no-underline">
                   <button
  title="invoices "
  onClick={() => setActiveItem("invoices")}
  className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    collapsed ? "md:justify-center" : ""
  } ${
    activeItem === "invoices "
      ? "bg-blue-500 text-white"
      : "text-gray-700 hover:bg-gray-100"
  }`}
>
  <div className="flex cursor-pointer items-center gap-3">
    <i className="fa-solid fa-file-invoice w-5 text-center" />
    <span className={`whitespace-nowrap ${hideWhenCollapsed}`}>
      Show Invoices 
    </span>
  </div>
</button>
          </Link>
          <Link href="/Fetures/Admin/contactpage" className="!no-underline hover:!no-underline">
           <button
            title="contact"
            onClick={() => setActiveItem("contact")}
            className={`w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              collapsed ? "md:justify-center" : ""
            } ${
              activeItem === "contact"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
           <i className="fa-solid fa-envelope w-5 text-center" />

              <span
                className={`whitespace-nowrap ${hideWhenCollapsed}`}
              >
               Contact us
              </span>
            </div>
          </button>
          </Link>
       <Link href="/login" className="!no-underline hover:!no-underline">
  <button
  onClick={logout}
    
    className="w-full cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-red-50 hover:text-red-600"
  >
    <div className="flex items-center gap-3">
      <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>

      <span className={`whitespace-nowrap ${hideWhenCollapsed}`}>
        Logout
      </span>
    </div>
  </button>
</Link>
         


          
 
          
         
       
          
 

           
        </nav>
        
      </aside>

      {/* ================= Mobile Overlay ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= Main ================= */}
      <div className="flex-1 flex justify-between flex-col min-w-0">

        {/* ================= Header ================= */}
        <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center gap-3 sticky top-0 z-20">

          {/* Toggle Sidebar */}
          <button
            onClick={toggleSidebar}
            className="w-9 h-9 cursor-pointer flex items-center rounded-lg text-gray-700  hover:text-gray-900"
            aria-label="Toggle sidebar"
          >
            <i className="fa-solid fa-bars" />
          </button>

          {/* Profile */}
          <div className="w-9 cursor-pointer h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
            <img src="https://elzerowebschool.github.io/HTML_And_CSS_Template_Three/imgs/avatar-04.png" className="rounded-full" alt="" />
          </div>

        </header>

        {/* ================= Page Content ================= */}
        <main className="flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}