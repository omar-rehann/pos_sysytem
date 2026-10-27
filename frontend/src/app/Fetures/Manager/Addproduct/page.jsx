import Sidebar from "../components/layot"
import AddProduct from "../components/addproduct"
export const metadata = {
  title: "Add Product",
  description: "Add a new product to your store",
}
function Addproductpage(){
    return(
        <>
        <Sidebar>
            <AddProduct/>
        </Sidebar>
        </>
    )
}
export default Addproductpage