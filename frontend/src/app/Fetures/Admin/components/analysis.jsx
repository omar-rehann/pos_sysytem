"use client";
import { useState, useEffect ,useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
function Analysis() {
  const [alluser, setuser] = useState([]);
  const [allmanger, setmanger] = useState([]);
  const [allstore, setstore] = useState([]);
  const [allcategorey, setcategorey] = useState([]);
  const [product, setproduct] = useState([]);
  const [order, setorder] = useState([]);
  const [loading, setLoading] = useState(true);
  //  all user
  const getuser = async () => {
    try {
      let response = await fetch(
        "http://localhost:4000/possysytem/userAuth/showuser",
      );
      let result = await response.json();
      console.log("raw categories:", result);
      if (result.success) {
        setuser(result.user);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setuser([]);
    }
  };
  // ───── show stores ─────
  const getstore = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/posystem/project/showstore`,
      );
      const result = await response.json();
      setstore(result.success ? result.data : []);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  // ───── show managers ─────
  const getmanger = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/posystem/project/showmanger`,
      );
      const result = await response.json();
      setmanger(result.success ? result.data : []);
    } catch (error) {
      console.error("Error fetching Manger:", error);
    }
  };
  // ───── show categorey ─────
  const getcategorey = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/posystem/project/showcategorey",
      );
      const result = await response.json();
      if (result.success) {
        setcategorey(result.data);
      } else {
        setcategorey([]);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const getproduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/posystem/project/showproduct`,
      );
      const result = await response.json();
      if (result.success && Array.isArray(result.products)) {
        setproduct(result.products);
      } else {
        setproduct([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setproduct([]);
    }
  };

  const getinvoices = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/posystem/project/showallinvoices`,
      );
      const result = await response.json();
      setorder(
        result.success && Array.isArray(result.invoices) ? result.invoices : [],
      );
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setorder([]);
    }
  };

useEffect(() => {
  const loadAll = async () => {
    await Promise.allSettled([
      getuser(),
      getstore(),
      getmanger(),
      getcategorey(),
      getproduct(),
      getinvoices(),
    ]);
    setLoading(false);
  };
  loadAll();
}, []);
  const [chartType, setChartType] = useState("bar"); // bar | pie

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

const chartData = useMemo(() => [
  { name: "User",     value: alluser.length },
  { name: "Manager",  value: allmanger.length },
  { name: "Store",    value: allstore.length },
  { name: "Category", value: allcategorey.length },
  { name: "Product",  value: product.length },
  { name: "Order",    value: order.length },
], [alluser, allmanger, allstore, allcategorey, product, order]);

  return (
    <>
      <div className="Analysis">
        <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
          <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
            Analysis Home Page
          </h3>

          <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
            <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
          </div>
        </div>
        <div className="content grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          <div className="box flex justify-between items-center bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl cursor-pointer">
            <h2>{alluser.length}</h2>
            <div className="info">
              <i className="fa-solid fa-user"></i>
              <h4>User</h4>
            </div>
          </div>

          <div className="box flex justify-between items-center bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl cursor-pointer">
            <h2>{allmanger.length}</h2>
            <div className="info">
              <i className="fa-solid fa-user-tie"></i>
              <h4>Manager</h4>
            </div>
          </div>

          <div className="box flex justify-between items-center bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl cursor-pointer">
            <h2>{allstore.length}</h2>
            <div className="info">
              <i className="fa-solid fa-store"></i>
              <h4>Store</h4>
            </div>
          </div>

          <div className="box flex justify-between items-center bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl cursor-pointer">
            <h2>{allcategorey.length}</h2>
            <div className="info">
              <i className="fa-solid fa-layer-group"></i>
              <h4>Category</h4>
            </div>
          </div>

          <div className="box flex justify-between items-center bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl cursor-pointer">
            <h2>{product.length}</h2>
            <div className="info">
              <i className="fa-solid fa-box"></i>
              <h4>Product</h4>
            </div>
          </div>

          <div className="box flex justify-between items-center bg-white shadow-md hover:shadow-lg transition p-5 m-2 rounded-xl cursor-pointer">
            <h2>{order.length}</h2>
            <div className="info">
              <i className="fa-solid fa-cart-shopping"></i>
              <h4>Order</h4>
            </div>
          </div>
        </div>
        <div className="chart bg-white shadow-md rounded-xl p-5 m-2">
  <div className="flex justify-between items-center mb-4">
    <h4 className="text-xl font-semibold text-gray-800">Statistics</h4>
    <select
      value={chartType}
      onChange={(e) => setChartType(e.target.value)}
      className="border rounded-lg px-3 py-1"
    >
      <option value="bar">Bar Chart</option>
      <option value="pie">Pie Chart</option>
    </select>
  </div>

  {loading ? (
    <p className="text-center text-gray-500">Loading...</p>
  ) : (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        {chartType === "bar" ? (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={120} label>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  )}
</div>
      </div>
    </>
  );
}
export default Analysis;
