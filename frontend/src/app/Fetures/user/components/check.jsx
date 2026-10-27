"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

const TAX_RATE = 0.14; // لازم يطابق الـ backend (0 لو مفيش ضريبة)

const inputClass =
  "border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition";

function Check() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // الحاجة الوحيدة اللي اليوزر بيكتبها
  const [payment, setPayment] = useState({
    paymentMethod: "cash",
    referenceNumber: "",
    amountPaid: "",
  });

  const handleChange = (e) =>
    setPayment((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const getorders = async (userId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/showorder?userId=${userId}`);
      const result = await res.json();
      setOrders(result.success && Array.isArray(result.orders) ? result.orders : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("user");
    const u = saved ? JSON.parse(saved) : null;
    setUser(u);

    if (!u?._id) {
      setLoading(false);
      return;
    }
    getorders(u._id).finally(() => setLoading(false));
  }, []);

  // الحسابات
  const productsCount = orders.length;
  const itemsCount = orders.reduce((s, o) => s + Number(o.quantity), 0);
  const subtotal = orders.reduce((s, o) => s + Number(o.price) * Number(o.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const paid = Number(payment.amountPaid) || 0;
  const change = paid - total;

  const handleCheckout = async () => {
    if (orders.length === 0) {
      return Swal.fire({ icon: "warning", title: "No orders to checkout" });
    }
    if (!payment.referenceNumber.trim()) {
      return Swal.fire({ icon: "warning", title: "Reference number is required" });
    }
    if (paid < total) {
      return Swal.fire({
        icon: "warning",
        title: "Amount paid is less than total",
        text: `Total is $${total.toFixed(2)}`,
      });
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/addpayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          paymentMethod: payment.paymentMethod,
          referenceNumber: payment.referenceNumber,
          amountPaid: paid,
        }),
      });
      const result = await res.json();

      if (result.success) {
        setSuccess(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
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
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md w-full text-center">
          <i className="fa-solid fa-circle-check text-green-500 text-6xl mb-4"></i>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Sale Completed Successfully!
          </h2>
          <p className="text-slate-500 text-sm mb-2">
            The transaction has been completed successfully.
          </p>
          {change > 0 && (
            <p className="text-slate-700 text-sm mb-6">
              Change: <span className="font-bold">${change.toFixed(2)}</span>
            </p>
          )}
          <Link
            href="/Fetures/user/Invoicespage"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Show Me Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
          <p className="text-slate-500 text-sm mt-1">Complete the transaction securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information: ثابتة من بيانات اليوزر */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-user text-blue-600"></i>
                Customer Information
              </h2>

              {loading ? (
                <p className="text-sm text-slate-400">Loading...</p>
              ) : user ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                      Customer Name
                    </span>
                    <p className="text-sm font-medium text-slate-800">{user.name}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                      Email
                    </span>
                    <p className="text-sm font-medium text-slate-800">{user.email}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                      Phone
                    </span>
                    <p className="text-sm font-medium text-slate-800">{user.phone || "—"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-red-500">Please log in to continue.</p>
              )}
            </div>

            {/* Payment: الوحيد اللي بيتكتب */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-credit-card text-blue-600"></i>
                Payment Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">
                    Transaction / Reference Number
                  </label>
                  <input
                    name="referenceNumber"
                    value={payment.referenceNumber}
                    onChange={handleChange}
                    placeholder="TRX-000035"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={payment.paymentMethod}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="wallet">Wallet</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">
                    Amount Paid
                  </label>
                  <input
                    name="amountPaid"
                    type="number"
                    min="0"
                    value={payment.amountPaid}
                    onChange={handleChange}
                    placeholder={total.toFixed(2)}
                    className={inputClass}
                  />
                  {paid > 0 && change >= 0 && (
                    <p className="text-xs text-green-600">Change: ${change.toFixed(2)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-receipt text-blue-600"></i>
                Order Summary
              </h2>

              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {loading ? (
                  <p className="text-sm text-slate-400 text-center py-4">Loading...</p>
                ) : orders.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4">No orders found</p>
                ) : (
                  orders.map((o) => (
                    <div key={o._id} className="flex items-center gap-3">
                      <img src={o.img} alt={o.name} className="w-10 h-10 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{o.name}</p>
                        <p className="text-xs text-slate-400">
                          {o.quantity} × ${Number(o.price).toFixed(2)}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-slate-800">
                        ${(Number(o.price) * Number(o.quantity)).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-3 mb-5 border-t border-slate-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Products</span>
                  <span className="font-medium text-slate-800">{productsCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total items</span>
                  <span className="font-medium text-slate-800">{itemsCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                  <span className="font-medium text-slate-800">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between">
                  <span className="font-semibold text-slate-800">Total</span>
                  <span className="font-bold text-blue-600 text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={submitting || orders.length === 0 || !user}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-xl transition-all"
              >
                <i className="fa-solid fa-check"></i>
                {submitting ? "Processing..." : "Complete Sale"}
              </button>

              <p className="text-xs text-slate-400 text-center mt-4 flex items-center justify-center gap-1">
                <i className="fa-solid fa-shield-halved"></i>
                Secure transaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Check;