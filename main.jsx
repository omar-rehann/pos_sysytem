"use client";
import { useEffect, useState } from "react";



export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); 
  const [activeItem, setActiveItem] = useState("dashboard");

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);
  const toggleSidebar = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setCollapsed((v) => !v);
    } else {
      setSidebarOpen((v) => !v);
    }
  };

  const hideWhenCollapsed = collapsed ? "md:hidden" : "";

  return (
    <div className="min-h-screen flex bg-gray-100" dir="ltr">

      {/* ================= Sidebar ================= */}
      <aside
        className={`fixed md:sticky md:top-0 md:h-screen inset-y-0 left-0 z-40 w-64 overflow-hidden bg-white shadow-lg transform transition-all duration-300 ${
          collapsed ? "md:w-[68px]" : "md:w-64"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >

        <div className="h-[61px] px-4 border-b flex items-center justify-between">
          <h1 className={`text-lg font-bold text-gray-800 whitespace-nowrap ${hideWhenCollapsed}`}>
            POS System
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close sidebar"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <nav className="p-3 space-y-1">

  {/* ===== Dashboard ===== */}
  <button
    title="Dashboard"
    onClick={() => setActiveItem("dashboard")}
    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      collapsed ? "md:justify-center" : ""
    } ${
      activeItem === "dashboard"
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <div className="flex items-center gap-3">
      <i className="fa-solid fa-home w-5 text-center" />
      <span className={`whitespace-nowrap ${hideWhenCollapsed}`}>Dashboard</span>
    </div>
  </button>

  {/* ===== Analytics ===== */}
  <button
    title="Analytics"
    onClick={() => setActiveItem("analytics")}
    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      collapsed ? "md:justify-center" : ""
    } ${
      activeItem === "analytics"
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <div className="flex items-center gap-3">
      <i className="fa-solid fa-chart-line w-5 text-center" />
      <span className={`whitespace-nowrap ${hideWhenCollapsed}`}>Analytics</span>
    </div>
  </button>

  {/* ===== Users (فيه badge) ===== */}
  <button
    title="Users"
    onClick={() => setActiveItem("users")}
    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      collapsed ? "md:justify-center" : ""
    } ${
      activeItem === "users"
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <div className="flex items-center gap-3">
      <i className="fa-solid fa-users w-5 text-center" />
      <span className={`whitespace-nowrap ${hideWhenCollapsed}`}>Users</span>
    </div>

    <span
      className={`text-xs px-2 py-0.5 rounded-full ${hideWhenCollapsed} ${
        activeItem === "users" ? "bg-white text-blue-500" : "bg-red-500 text-white"
      }`}
    >
      5
    </span>
  </button>

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

          {/* Toggle Sidebar (ظاهر على كل الشاشات) */}
          <button
            onClick={toggleSidebar}
            className="w-9 h-9 flex items-center  rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            aria-label="Toggle sidebar"
          >
            <i className="fa-solid fa-bars" />
          </button>

          {/* Profile */}
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
            A
          </div>

        </header>

        {/* ================= Content ================= */}
        <main className="flex-1 p-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
            {activeItem}
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Total Sales", value: "$1,234" },
              { label: "Total Orders", value: "2,468" },
              { label: "Total Customers", value: "3,702" },
            ].map((c) => (
              <div key={c.label} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">{c.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{c.value}</p>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}