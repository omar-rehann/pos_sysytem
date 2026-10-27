import Sidebar from "../components/layot"
import Addmanger from "../components/addmanger"
export const metadata = {
  title: "Add Manager | Admin | POS System",
  description: "Create a new manager account and assign a store and category.",
  
}
function Addmangerpage(){
    return(
        <>
        <Sidebar>
            <Addmanger/>
        </Sidebar>
        </>
    )
}
export default Addmangerpage