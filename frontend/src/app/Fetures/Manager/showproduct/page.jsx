import Sidebar from "../components/layot"
import Showproduct from "../components/showproduct"
export const metadata = {
  title: "All Products",
  description: "View and manage all Products ",
}
function Showproductpage(){
    return(
        <>
        <Sidebar>
            <Showproduct/>
        </Sidebar>
        
        </>
    )
}
export default Showproductpage