"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";


function Showproduct() {
  const [allproduct, setallproduct] = useState([]);
  const [allcategorey, setallcategorey] = useState([]);
  // Edit state
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editprice, setEditprice] = useState("");
  const [editcategorey, setEditcategorey] = useState("");
console.log("all product",allproduct)
  // show products
const getproduct = async () => {
  try {
    const response = await fetch(`http://localhost:4000/posystem/project/showproduct`);
    const result = await response.json();
    if (result.success && Array.isArray(result.products)) {
      setallproduct(result.products);
    } else {
      setallproduct([]);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    setallproduct([]);
  }
};


const getcategorey = async () => {
  try {
    const response = await fetch(`http://localhost:4000/posystem/project/showcategorey`);
    const result = await response.json();
    console.log("categories response:", result);
    if (result.success && Array.isArray(result.data)) {
      setallcategorey(result.data);
    } else {
      setallcategorey([]);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    setallcategorey([]);
  }
};

  useEffect(() => {
    getcategorey();
    getproduct();
  }, []);

  // delete product
  const deleteproduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/posystem/project/deleteproduct/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setallproduct((prev) =>
          prev.filter((e) => String(e._id) !== String(id)),
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: data.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // confirm delete
  const confirmDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Product? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await deleteproduct(id);
    }
  };

  // edit product
  const editproduct = async (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    if (editName) formData.append("name", editName);
    if (editImage) formData.append("image", editImage);
    if (editprice) formData.append("price", editprice);
    if (editcategorey) formData.append("category", editcategorey);

    try {
      const response = await fetch(`http://localhost:4000/posystem/project/editproduct/${id}`, {
        method: "PUT",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setallproduct((prev) =>
          prev.map((s) => (String(s._id) === String(id) ? result.data : s)),
        );
        setEditName("");
        setEditImage(null);
        setEditprice("");
        setEditcategorey("");
        Swal.fire({
          icon: "success",
          title: "Product Updated!",
          text: result.message,
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: result.message,
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // اسم الكاتيجوري (populate أو id)
  const getCategoryName = (pro) =>
    pro.category?.name ||
    allcategorey.find((c) => c._id === pro.category)?.name ||
    "-";

  return (
    <>
      <div className="showproduct">
        <div className="container mt-5 p-2 m-2 me-5 px-6 mb-12">
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5">
            Show Products
          </h3>

          <div className="relative w-[90%] h-1 bg-gray-100 rounded-full">
            <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
          </div>
        </div>

        <div className="content">
          <div className="proegorey bg-white shadow-md rounded m-5">
            <Table>
              <TableHeader className="text-center">
                <TableRow>
                  <TableHead className="text-center">#</TableHead>
                  <TableHead className="text-center">Img Product</TableHead>
                  <TableHead className="text-center">Name Product</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-center">Category</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {allproduct.length > 0 ? (
                  allproduct.map((pro, index) => (
                    <TableRow key={pro._id}>
                      <TableCell className="text-center">{index + 1}</TableCell>

                      <TableCell className="text-center">
                        <img
                          src={pro.img}
                          alt={pro.name}
                          className="w-14 h-14 object-cover rounded-lg mx-auto"
                        />
                      </TableCell>

                      <TableCell className="text-center">{pro.name}</TableCell>
                      <TableCell className="text-center">{pro.price}</TableCell>
                    <TableCell className="text-center">{pro.categorey}</TableCell>
                      <TableCell className="text-center">
                        {getCategoryName(pro)}
                      </TableCell>

                      <TableCell className="text-center">
                        <div className="flex justify-center items-center">
                          <Dialog>
                            <DialogTrigger
                              render={
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setEditName(pro.name || "");
                                    setEditprice(pro.price ?? "");
                                    setEditcategorey(
                                      pro.category?._id || pro.category || "",
                                    );
                                    setEditImage(null);
                                  }}
                                  className="ms-2 inline-flex items-center gap-2 rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-700 cursor-pointer"
                                >
                                  <i className="fa-solid fa-edit"></i>
                                  Edit
                                </Button>
                              }
                            />

                            <DialogContent className="bg-white p-6 rounded-lg sm:max-w-md">
                              <form
                                className="flex flex-col gap-4"
                                onSubmit={(e) => editproduct(e, pro._id)}
                              >
                                <DialogHeader>
                                  <DialogTitle className="text-lg font-semibold">
                                    Edit Product
                                  </DialogTitle>
                                  <DialogDescription className="text-sm text-gray-500">
                                    Update your Product details here. Click save
                                    when you&apos;re done.
                                  </DialogDescription>
                                </DialogHeader>

                                <FieldGroup className="flex flex-col gap-4">
                                  <Field className="flex flex-col gap-2">
                                    <Label htmlFor="name-1">Name</Label>
                                    <input
                                      onChange={(e) =>
                                        setEditName(e.target.value)
                                      }
                                      value={editName}
                                      className="bg-gray-300 shadow-2xl p-2 rounded"
                                      id="name-1"
                                      type="text"
                                      placeholder="Enter Product Name"
                                    />
                                  </Field>

                                  <Field className="flex flex-col gap-2">
                                    <Label htmlFor="price-1">Price</Label>
                                    <input
                                      onChange={(e) =>
                                        setEditprice(e.target.value)
                                      }
                                      value={editprice}
                                      className="bg-gray-300 shadow-2xl p-2 rounded"
                                      id="price-1"
                                      type="number"
                                      placeholder="Enter Price"
                                    />
                                  </Field>

                                  <Field className="flex flex-col gap-2">
                                    <Label htmlFor="img-1">Image</Label>
                                    <input
                                      onChange={(e) =>
                                        setEditImage(e.target.files[0])
                                      }
                                      type="file"
                                      className="cursor-pointer"
                                      id="img-1"
                                    />
                                  </Field>

                                  <Field className="flex flex-col gap-2">
                                    <Label htmlFor="category-1">Category</Label>
                                    <select
                                      id="category-1"
                                      value={editcategorey}
                                      onChange={(e) =>
                                        setEditcategorey(e.target.value)
                                      }
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                      <option value="" disabled>
                                        Select Category
                                      </option>
                                      {allcategorey.map((item) => (
                                        <option key={item._id} value={item._id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                  </Field>
                                </FieldGroup>

                                <DialogFooter className="flex justify-end gap-2">
                                  <DialogClose
                                    render={
                                      <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded cursor-pointer bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
                                      >
                                        Cancel
                                      </Button>
                                    }
                                  />
                                  <Button
                                    type="submit"
                                    className="rounded cursor-pointer bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                  >
                                    Save changes
                                  </Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>

                          <button
                            onClick={() => confirmDelete(pro._id)}
                            className="cursor-pointer w-20 text-white text-center bg-red-500 hover:bg-red-700 ms-2 p-2 rounded"
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash ms-2"></i>
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-5">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Showproduct;