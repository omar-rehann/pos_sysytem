import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function AddProduct(){
    return(
        <>
        <div className="categorey">
                    <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
    <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
      Add Product
    </h3>

    <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
      <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
    </div>
  </div>
   <div className="content bg-white shadow-md rounded-xl p-5 m-2  space-y-4">
  <input
    type="file"
    className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer
      file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white
      file:cursor-pointer hover:file:bg-blue-600"
  />
  <input
    type="text"
    placeholder="Name Product"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <select name="" id="" className="bg-gray-100 w-full p-2 rounded">
        <option value="store1"disabled required>Categorey</option>
    <option value="cat1">cat1</option>
    <option value="cat2">cat2</option>
    <option value="cat3">cat3</option>
    <option value="cat4">cat4</option>
    <option value="cat5">cat5</option>

  </select>
  <select name="" id="" className="bg-gray-100 w-full p-2 rounded">
        <option value="store1"disabled required>Store</option>
    <option value="Store1">Store1</option>
    <option value="Store2">Store2</option>
    <option value="Store3">Store3</option>
    <option value="Store4">Store4</option>
    <option value="Store5">Store5</option>

  </select>
  <button
    className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white
      font-medium py-2 rounded-lg transition-colors"
  >
    Add Product
  </button>
</div>
<div className="Categorey bg-white shadow-md   rounded m-5">
 <Table>
      <TableHeader className="text-center">
        <TableRow>
          <TableHead className=" text-center">#</TableHead>
          <TableHead className=" text-center">Img Product</TableHead>
          <TableHead className=" text-center">Name Product</TableHead>
        <TableHead className=" text-center">Categorey</TableHead>
        <TableHead className=" text-center">Store</TableHead>
          <TableHead className=" text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" text-center">
          <TableRow>
            <TableCell>
          <h4>1</h4>
        </TableCell>
        <TableCell className="text-center mx-auto">
          <img
            src="https://elzerowebschool.github.io/HTML_And_CSS_Template_Three/imgs/avatar-03.png"
            alt=""
            className="w-12 h-12 object-cover rounded-lg  mx-auto "
          />
        </TableCell>

        <TableCell className="font-medium">Phone</TableCell>
        <TableCell className="font-medium">Tablet</TableCell>
        <TableCell className="font-medium">Tablet</TableCell>


        <TableCell className="">
          <button
            className="cursor-pointer w-20 text-white text-center bg-blue-500 hover:bg-blue-700   p-2 rounded"
            title="Edit"
          >
            <i className="fa-solid fa-pen-to-square ms-2"></i>
            Edit
          </button>
          <button
            className="cursor-pointer w-20 text-white text-center bg-red-500 hover:bg-red-700 ms-2   p-2 rounded"
            title="Delete"
          >
            <i className="fa-solid fa-trash ms-2"></i>
            Delete
          </button>
        </TableCell>
      </TableRow>
       
      </TableBody>
      
    </Table>
</div>
        </div>
        </>
    )
}
export default AddProduct