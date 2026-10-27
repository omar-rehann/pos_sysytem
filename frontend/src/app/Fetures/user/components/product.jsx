"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


function Products() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getorders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user?._id) {
        setOrders([]);
        return;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/showorder?userId=${user._id}`);
      const result = await response.json();
      setOrders(result.success && Array.isArray(result.orders) ? result.orders : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteorder = async (id) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This order will be deleted.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });
    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/deleteorder/${id}`, { method: "DELETE" });
      const result = await response.json();

      if (result.success) {
        setOrders((prev) => prev.filter((o) => o._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: result.message,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
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
    }
  };

  useEffect(() => {
    getorders();
  }, []);

  const productsCount = orders.length;
  const itemsCount = orders.reduce((s, o) => s + Number(o.quantity), 0);
  const total = orders.reduce((s, o) => s + Number(o.price) * Number(o.quantity), 0);

  return (
    <div className="products p-3 m-2">
      <Table>
        <TableCaption>
          You have {productsCount} products ({itemsCount} items)
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                Loading...
              </TableCell>
            </TableRow>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <img src={order.img} alt={order.name} className="w-12 h-12 rounded object-cover" />
                </TableCell>
                <TableCell className="font-medium">{order.name}</TableCell>
                <TableCell>{order.categorey}</TableCell>
                <TableCell>${Number(order.price).toFixed(2)}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell className="text-right">
                  ${(Number(order.price) * Number(order.quantity)).toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => deleteorder(order._id)}
                    className="bg-red-600 hover:bg-red-700 transition text-white w-9 h-9 rounded cursor-pointer"
                    aria-label="Delete order"
                    title="Delete order"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                <i className="fa-solid fa-box-open text-4xl mb-3 opacity-50"></i>
                <p className="text-lg font-medium">No orders found</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right font-bold">${total.toFixed(2)}</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell colSpan={7} className="text-right">
              <Link
                href="/Fetures/user/checkoutpage"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-credit-card"></i>
                Proceed to Checkout
              </Link>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
export default Products;