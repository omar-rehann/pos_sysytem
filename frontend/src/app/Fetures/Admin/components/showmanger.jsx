"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";


function ShowManger() {
  const [allmanger, setmanger] = useState([]);
  const [allstore, setstoree] = useState([]);

  // Edit state
  const [editId, setEditId] = useState(null); // id of the manager being edited (opens the dialog)
  const [editName, setEditName] = useState("");
  const [editemail, setEditemail] = useState("");
  const [editpassword, setEditpassword] = useState("");
  const [editadress, setEditadress] = useState("");
  const [editstore, setEditstore] = useState("");
  const [editnumber, setEditnumber] = useState("");
  const [editImage, setEditImage] = useState(null);

  // ───── show stores ─────
  const getstore = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/showstore`);
      const result = await response.json();
      setstoree(result.success ? result.data : []);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  // ───── show managers ─────
  const getmanger = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/showmanger`);
      const result = await response.json();
      setmanger(result.success ? result.data : []);
    } catch (error) {
      console.error("Error fetching Manger:", error);
    }
  };

  // ───── delete manager ─────
  const deletemanger = async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/deletemanger/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setmanger((prev) => prev.filter((m) => String(m._id) !== String(id)));
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: data.message,
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: data.message,
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({ icon: "error", title: "Server error" });
    }
  };

  // ───── confirm message ─────
  const confirmDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Manger? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await deletemanger(id);
    }
  };

  // ───── open edit dialog (prefill with current values) ─────
  const openEdit = (manger) => {
    setEditId(manger._id);
    setEditName(manger.name || "");
    setEditemail(manger.email || "");
    setEditadress(manger.adress || "");
    setEditnumber(manger.number || "");
    setEditstore(manger.store || "");
    setEditpassword(""); // empty = keep the old password
    setEditImage(null);
  };

  // ───── edit manager ─────
  const editmanger = async (e, id) => {
    e.preventDefault();
    if (!id) return;

    const formData = new FormData();
    if (editName) formData.append("name", editName);
    if (editImage) formData.append("image", editImage);
    if (editpassword) formData.append("password", editpassword);
    if (editemail) formData.append("email", editemail);
    if (editadress) formData.append("adress", editadress);
    if (editstore) formData.append("store", editstore);
    if (editnumber) formData.append("number", editnumber);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posystem/project/editmanger/${id}`, {
        method: "PUT",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setmanger((prev) =>
          prev.map((m) => (String(m._id) === String(id) ? result.data : m))
        );
        setEditId(null);
        Swal.fire({
          icon: "success",
          title: "Manger Updated!",
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
      Swal.fire({ icon: "error", title: "Server error" });
    }
  };

  useEffect(() => {
    getmanger();
    getstore();
  }, []);

  // show the store name instead of its id
  const storeName = (id) =>
    allstore.find((s) => String(s._id) === String(id))?.name || id;

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <>
      <div className="store bg-white shadow-md rounded m-5">
        <div className="container mt-5 p-2 m-2 me-5 px-6 mb-12">
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5">
            Show Manger
          </h3>

          <div className="relative w-[90%] h-1 bg-gray-100 rounded-full">
            <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
          </div>
        </div>

        <div className="content">
          <Table>
            <TableHeader className="text-center">
              <TableRow>
                <TableHead className="text-center">#</TableHead>
                <TableHead className="text-center">Img Manger</TableHead>
                <TableHead className="text-center">Name Manger</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Address</TableHead>
                <TableHead className="text-center">Number</TableHead>
                <TableHead className="text-center">Store</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allmanger.length > 0 ? (
                allmanger.map((manger, index) => (
                  <TableRow key={manger._id}>
                    <TableCell className="text-center">{index + 1}</TableCell>

                    <TableCell className="text-center">
                      <img
                        src={manger.img}
                        alt={manger.name}
                        className="w-14 h-14 object-cover rounded-lg mx-auto"
                      />
                    </TableCell>

                    <TableCell className="text-center">{manger.name}</TableCell>
                    <TableCell className="text-center">{manger.email}</TableCell>
                    <TableCell className="text-center">{manger.adress}</TableCell>
                    <TableCell className="text-center">{manger.number}</TableCell>
                    <TableCell className="text-center">
                      {storeName(manger.store)}
                    </TableCell>

                    <TableCell className="mx-auto text-center flex justify-center items-center">
                      {/* Edit */}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => openEdit(manger)}
                        className="ms-2 inline-flex items-center gap-2 rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-700 cursor-pointer"
                      >
                        <i className="fa-solid fa-edit"></i>
                        Edit
                      </Button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => confirmDelete(manger._id)}
                        className="cursor-pointer w-20 text-white text-center bg-red-500 hover:bg-red-700 ms-2 p-2 rounded"
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash ms-2"></i>
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-5">
                    No managers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ───── One edit dialog for the whole table ───── */}
      <Dialog
        open={editId !== null}
        onOpenChange={(open) => {
          if (!open) setEditId(null);
        }}
      >
        <DialogContent className="bg-white p-6 rounded-lg sm:max-w-md">
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => editmanger(e, editId)}
          >
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Edit Manger
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Update the manager details here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup className="flex flex-col gap-4">
              {/* Image */}
              <Field className="flex flex-col gap-2">
                <Label htmlFor="edit-img">Image</Label>
                <input
                  type="file"
                  id="edit-img"
                  accept="image/*"
                  className="cursor-pointer"
                  onChange={(e) => setEditImage(e.target.files?.[0] || null)}
                />
              </Field>

              {/* Name */}
              <Field className="flex flex-col gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <input
                  type="text"
                  id="edit-name"
                  placeholder="Enter Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={inputClass}
                />
              </Field>

              {/* Email */}
              <Field className="flex flex-col gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <input
                  type="email"
                  id="edit-email"
                  placeholder="Enter Email"
                  value={editemail}
                  onChange={(e) => setEditemail(e.target.value)}
                  className={inputClass}
                />
              </Field>

              {/* Password */}
              <Field className="flex flex-col gap-2">
                <Label htmlFor="edit-password">New Password</Label>
                <input
                  type="password"
                  id="edit-password"
                  placeholder="Leave empty to keep the current password"
                  value={editpassword}
                  onChange={(e) => setEditpassword(e.target.value)}
                  className={inputClass}
                />
              </Field>

              {/* Number */}
              <Field className="flex flex-col gap-2">
                <Label htmlFor="edit-number">Phone Number</Label>
                <input
                  type="number"
                  id="edit-number"
                  placeholder="Enter Number"
                  value={editnumber}
                  onChange={(e) => setEditnumber(e.target.value)}
                  className={inputClass}
                />
              </Field>

              {/* Address */}
              <Field className="flex flex-col gap-2">
                <Label htmlFor="edit-address">Address</Label>
                <input
                  type="text"
                  id="edit-address"
                  placeholder="Enter Address"
                  value={editadress}
                  onChange={(e) => setEditadress(e.target.value)}
                  className={inputClass}
                />
              </Field>

              {/* Store */}
              <Field className="flex flex-col gap-2">
                <Label htmlFor="edit-store">Store</Label>
                <select
                  id="edit-store"
                  value={editstore}
                  onChange={(e) => setEditstore(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Store
                  </option>
                  {allstore.map((item) => (
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
                    className="rounded cursor-pointer bg-gray-800 px-4 py-2 p-4 text-white hover:bg-gray-900"
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
    </>
  );
}

export default ShowManger;