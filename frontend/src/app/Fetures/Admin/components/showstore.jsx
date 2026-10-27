"use client"
// start table show store
import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// start edit button
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import Swal from 'sweetalert2';
import { useState ,useEffect} from "react"
function ShowStore(){
      const [name,setname]=useState('');
  const [image,setimage]=useState(null);
  const [allstore,setstore]=useState([]);
  // Edit statte 
  const [editName, setEditName] = useState('');
const [editImage, setEditImage] = useState(null);
    //  show store
    const getstore = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/posystem/project/showstore"
        );
    
        const result = await response.json();
    
        if (result.success) {
          setstore(result.data);
          setimage('');
          setname('');
          await getstore()
        } else {
          setstore([]);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    useEffect(()=>{
      getstore()
    },[]);
    // delete store
    const deletestore = async (id) => {
        try {
          const response = await fetch(
            `http://localhost:4000/posystem/project/deletestore/${id}`,
            { method: "DELETE" }
          );
          let data = await response.json();
          if (data.success) {
     setstore((prev) =>
      prev.filter((e) => String(e._id) !== String(id))
    );
       
          }
        } catch (error) {
          console.log(error);
        }
      };
    // confirm message
    const confirmDelete = async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this store? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
    
      if (result.isConfirmed) {
        await deletestore(id);
      }
    };
    // edit store
    const editstore = async (e, id) => {
      e.preventDefault();
      const formData = new FormData();
      if (editName) formData.append("name", editName);
      if (editImage) formData.append("image", editImage);
    
      try {
        const response = await fetch(
          `http://localhost:4000/posystem/project/editstore/${id}`,
          { method: "PUT", body: formData }
        );
        const result = await response.json();
    
        if (result.success) {
          setstore((prev) =>
            prev.map((s) => (String(s._id) === String(id) ? result.data : s))
          );
          setEditName('');
          setEditImage(null);
          Swal.fire({
            icon: "success",
            title: "Store Updated!",
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
    return(
        <>
        {/* data store action edit and delete */}
<div className="store bg-white shadow-md   rounded m-5">
             <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
    <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
      Show Store
    </h3>

    <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
      <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
    </div>
  </div>
    <div className="content">
         <Table>
      <TableHeader className="text-center">
        <TableRow>
          <TableHead className=" text-center">#</TableHead>
          <TableHead className=" text-center">Img Store</TableHead>
          <TableHead className=" text-center">Name Store</TableHead>
          <TableHead className=" text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
  {allstore.length > 0 ? (
    allstore.map((store, index) => (
      <TableRow key={store._id}>
        <TableCell className="text-center">
          {index + 1}
        </TableCell>

        <TableCell className="text-center">
          <img
            src={store.img}
            alt={store.name}
            className="w-14 h-14 object-cover rounded-lg mx-auto"
          />
        </TableCell>

        <TableCell className="text-center">
          {store.name}
        </TableCell>

       <TableCell className="mx-auto text-center flex justify-center items-center">
          <Dialog>
  <DialogTrigger
    render={
      <Button
        variant="outline"
        className="ms-2 inline-flex items-center gap-2 rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-700 cursor-pointer"
      >
        <i className="fa-solid fa-edit"></i>
        Edit
      </Button>
    }
  />

  <DialogContent className="bg-white p-6 rounded-lg sm:max-w-md">
    <form className="flex flex-col gap-4" >
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">Edit Store</DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          Update your store details here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>

      <FieldGroup className="flex flex-col gap-4">
        <Field className="flex flex-col gap-2">
          <Label htmlFor="name-1">Name</Label>
          <input onChange={(e)=>setEditName(e.target.value)} value={editName} className="bg-gray-300 shadow-2xl p-2 rouded" id="name-1" type="text" placeholder="Enter Update Name Store" name="" id="" />
        </Field>

        <Field className="flex flex-col gap-2">
          <Label htmlFor="img-1">Image</Label>
          <input onChange={(e)=>setimage(e.target.files[0])} type="file" className="cursor-pointer"  id="img-1" name="" />
        </Field>
      </FieldGroup>

      <DialogFooter className="flex justify-end gap-2">
        <DialogClose
          render={
            <Button
              type="button"
              variant="outline"
              className="rounded cursor-pointer bg-gray-800 px-4 py-2  p-4 text-white hover:bg-gray-900"
            >
              Cancel
            </Button>
          }
        />
        <Button
        onClick={(e)=>editstore(e,store._id)}
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
          onClick={()=>confirmDelete(store._id)}
            className="cursor-pointer w-20 text-white text-center bg-red-500 hover:bg-red-700 ms-2   p-2 rounded"
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
      <TableCell colSpan={4} className="text-center py-5">
        No stores found
      </TableCell>
    </TableRow>
  )}
</TableBody>
     
      
    </Table>

    </div>

</div>
        </>
    )
}
export default ShowStore