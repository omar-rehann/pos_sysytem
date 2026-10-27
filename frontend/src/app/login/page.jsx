"use client";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function LoginPage() {

  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");
  const [loading, setloading] = useState(false);

  const handlelogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing data",
        text: "Please enter your email and password.",
      });
      return;
    }

    // Default role is "user" if nothing was chosen
    const selectedRole = role || "user";
    setloading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/possysytem/userAuth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role: selectedRole }),
        }
      );
      const result = await response.json();
      console.log("result",result)

      if (result.success === false) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: result.message || "Invalid email or password!",
          confirmButtonText: "Try Again",
        });
        return; 
      }

      localStorage.setItem("logintoken", JSON.stringify(result.logintoken));
      localStorage.setItem("user", JSON.stringify(result.user)); 


      if (email === "omarrehan724@gmail.com" && selectedRole === "Admin") {
        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome Admin!",
          confirmButtonText: "Continue",
        });
        router.push("/Fetures/Admin/Homepage");
      } else if (selectedRole === "user") {
        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome User!",
          confirmButtonText: "Continue",
        });
        router.push("/Fetures/user/Homepage");
      }  else if (selectedRole === "Manager") {
         await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome Manager!",
          confirmButtonText: "Continue",
        });
  router.push("/Fetures/Manager/Homepage");

} else {
  Swal.fire({ icon: "error", title: "Access denied", text: "You are not authorized for this role." });
}
      setemail("");
      setrole("");
      setpassword("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server error",
        text: "Could not reach the server. Please try again.",
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        {/* ───── Left Panel ───── */}
        <div className="hidden md:flex flex-col justify-end relative flex-1 bg-[#0F4C81] p-10 overflow-hidden">
          <div className="absolute w-56 h-56 rounded-full bg-white/5 -top-16 -right-16 pointer-events-none" />
          <div className="absolute w-32 h-32 rounded-full bg-white/5 top-1/2 -left-10 pointer-events-none" />

          <div
            className="absolute inset-0 bg-center bg-cover opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80')",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
              <i className="fa-solid fa-cash-register text-[#5BA3D9] text-sm"></i>
              <span className="text-white text-sm font-medium tracking-wide">
                POS System
              </span>
            </div>

            <h1 className="text-white text-3xl font-semibold leading-snug mb-3">
              Manage sales
              <br />
              with speed &amp; ease
            </h1>

            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Process transactions, track inventory, and manage customers — all
              from one powerful and intuitive point-of-sale system.
            </p>

            <div className="flex gap-8 mt-8">
              <div>
                <p className="text-white text-xl font-semibold">10k+</p>
                <p className="text-white/60 text-xs mt-0.5">Transactions</p>
              </div>
              <div>
                <p className="text-white text-xl font-semibold">24/7</p>
                <p className="text-white/60 text-xs mt-0.5">Uptime</p>
              </div>
              <div>
                <p className="text-white text-xl font-semibold">99%</p>
                <p className="text-white/60 text-xs mt-0.5">Accuracy</p>
              </div>
            </div>
          </div>
        </div>

        {/* ───── Right Panel ───── */}
        <div className="flex-1 bg-white flex flex-col justify-center px-8 py-10 md:px-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to your POS account
            </p>
            <p className="text-xs bg-gray-400 shadow-2xl p-3 rounded mt-2">
              Default role is User. Access to Admin and Manager accounts is
              restricted to authorized users only.
            </p>
          </div>

          {/* login */}
          <form onSubmit={handlelogin} className="login space-y-4">
            <select
              defaultValue="Choose Direction"
              onChange={(e) => setrole(e.target.value)}
              className="bg-gray-200 text-black w-full p-2 rounded"
            >
              <option value="Choose Direction" disabled>
                Choose Direction
              </option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="user">user</option>
            </select>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                onChange={(e) => setemail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                required
                className="w-full bg-gray-200 px-4 py-2.5 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F6E56] focus:border-transparent transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your password"
                name="password"
                id="password"
                required
                className="w-full bg-gray-200 px-4 py-2.5 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F6E56] focus:border-transparent transition"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-400">
                Create New Account?{" "}
                <Link href="/Register">
                  <span className="text-[#150f6e] font-medium">Register</span>
                </Link>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mb-2 cursor-pointer bg-[#150f6e] hover:bg-[#1a10a8] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition duration-200"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mb-8 mt-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-[#150f6e] rounded-full px-3 py-1.5">
              <i className="fa-solid fa-bolt text-xs"></i>
              Fast Checkout
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-[#150f6e] rounded-full px-3 py-1.5">
              <i className="fa-solid fa-boxes-stacked text-xs"></i>
              Inventory Tracking
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-[#150f6e] rounded-full px-3 py-1.5">
              <i className="fa-solid fa-lock text-xs"></i>
              Secure Payments
            </span>
          </div>
        </div>
      </div>
    </main>
    
  );
}

export default LoginPage;