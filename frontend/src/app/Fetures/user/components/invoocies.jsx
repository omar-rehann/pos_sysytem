"use client"
import { useState, useEffect } from "react";

const API = "http://localhost:4000/posystem/project";

const getUser = () => {
  try {
    const saved = localStorage.getItem("user");
    return saved && saved !== "undefined" ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getinvoices = async () => {
    try {
      const user = getUser();
      if (!user?._id) {
        setInvoices([]);
        return;
      }
      const response = await fetch(`${API}/showinvoices?userId=${user._id}`);
      const result = await response.json();
      setInvoices(result.success && Array.isArray(result.invoices) ? result.invoices : []);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getinvoices();
  }, []);

  return (
    <div className="invocies">
      <div className="container mt-5 p-2 m-2 me-5 px-6 mb-12">
        <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5">
          invoices
        </h3>
        <div className="relative w-[90%] h-1 bg-gray-100 rounded-full">
          <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
        </div>
      </div>

      <div className="content grid grid-cols-3">
        {loading ? (
          <p className="text-center py-10 text-gray-400">Loading...</p>
        ) : invoices.length > 0 ? (
          invoices.map((inv) => (
            <div
              key={inv._id}
              className="box bg-white shadow-md p-5 m-2 rounded-xl"
            >
              <div className="flex flex-wrap justify-between gap-2 mb-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase">Reference</p>
                  <p className="font-semibold text-gray-900">{inv.referenceNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-center text-gray-400 uppercase">Date</p>
                  <p className="font-medium text-gray-800">
                    {new Date(inv.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase">Payment Method</p>
                  <p className="font-medium text-gray-800 capitalize">{inv.paymentMethod}</p>
                </div>
              </div>

              <hr />

              {/* المنتجات */}
              <div className="space-y-2 my-3">
                {inv.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {item.quantity} × ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <hr />

              {/* الإجماليات */}
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${Number(inv.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>${Number(inv.tax).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-blue-600">${Number(inv.total).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount Paid</span>
                  <span>${Number(inv.amountPaid).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            <i className="fa-solid fa-file-invoice text-5xl mb-3 opacity-50"></i>
            <p className="text-lg font-medium">No invoices found</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Invoices;