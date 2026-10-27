import Sidebar from "../components/layot"
import Addstore from "../components/addstore"
export const metadata = {
  title: "Add Store | Admin | POS System",
  description: "Create a new store with its name and image.",
  
}
function AddstorePage(){
    return(
        <>
        <Sidebar>
            <Addstore/>
        </Sidebar>
        </>
    )
}
export default AddstorePage