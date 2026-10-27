import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
function User(){
    return(
        <>
        <div className="user">
                          <div className="container mt-5  p-2 m-2 me-5  px-6  mb-12">
    <h3 className="text-3xl md:text-4xl  font-semibold text-gray-900 mb-5">
      Show User
    </h3>

    <div className="relative w-[90%]   h-1 bg-gray-100 rounded-full">
      <span className="absolute left-0 top-0 w-32 h-1 bg-blue-600 rounded-full"></span>
    </div>
  </div>
  <div className="user bg-white shadow-md   rounded m-5">
 <Table>
      <TableHeader className="text-center">
        <TableRow>
          <TableHead className=" text-center">#</TableHead>
          <TableHead className=" text-center">Img</TableHead>
          <TableHead className=" text-center">Name User</TableHead>
        <TableHead className=" text-center">Email</TableHead>
          <TableHead className=" text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" text-center">
          <TableRow>
            <TableCell>
          <h4>1</h4>
        </TableCell>
     
<TableCell><img src="https://elzerowebschool.github.io/HTML_And_CSS_Template_Three/imgs/avatar-05.png" className="w-15 h-15 rounded-full text-center mx-auto" alt="" /></TableCell>
        <TableCell className="font-medium">omar rehan</TableCell>
        <TableCell className="font-medium">omarrehan724@fmai,com</TableCell>


        <TableCell className="">
        
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
export default User