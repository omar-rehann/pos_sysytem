import Sidebar from "../components/layot"
import Addcategorey from "../components/addcategorey"
export const metadata = {
  title: "Add Manager | Admin | POS System",
  description: "Create a new manager account and assign a store and category.",
 
}
function Addproductpage(){
    return(
        <>
        <Sidebar>
            <Addcategorey/>
        </Sidebar>
        </>
    )
}
export default Addproductpage