"use client";
import { useState } from "react";


export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="p-4 bg-slate-100 px-4">
      {/* Header */}
       <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
    <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
      Contact Us 
    </h3>

    <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
      <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
    </div>
  </div>
      

      {/* Info Cards - Manual */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
        
       

        {/* Email */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
          <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center">
            <i className="fa-solid fa-envelope text-teal-600 text-lg"></i>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
              Email
            </p>
            <p className="text-sm font-semibold text-slate-800">
              support@medbook.com
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              We reply within 24 hours
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
          <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center">
            <i className="fa-solid fa-location-dot text-rose-600 text-lg"></i>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
              Address
            </p>
            <p className="text-sm font-semibold text-slate-800">
              123 Health Ave, New York, NY
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Main clinic headquarters
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
            <i className="fa-solid fa-clock text-amber-600 text-lg"></i>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
              Working Hours
            </p>
            <p className="text-sm font-semibold text-slate-800">
              Mon – Fri: 8am – 8pm
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Sat – Sun: 9am – 5pm
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto bg-white rounded-2xl shadow-sm p-8">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <i className="fa-solid fa-circle-check text-green-500 text-6xl"></i>
            <h2 className="text-xl font-semibold text-slate-800">
              Message Sent!
            </h2>
            <p className="text-slate-400 text-sm max-w-xs">
              Thank you for reaching out. Our team will get back to you within
              24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  name: "",
                  email: "",
                  message: "",
                });
              }}
              className="mt-2 text-blue-600 text-sm underline underline-offset-2"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h2 className="text-xl font-semibold text-slate-800">
              Send us a message
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@email.com"
                  className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
                />
              </div>
            </div>

           

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe your inquiry or question..."
                className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all disabled:opacity-60"
            >
              {loading ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                <i className="fa-solid fa-paper-plane text-xs"></i>
              )}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}