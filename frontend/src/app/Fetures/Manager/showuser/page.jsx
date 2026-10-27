import Sidebar from "../components/layot"
import User from "../components/user"

export const metadata = {
  title: "Users | Manager | POS System",
  description: "View and manage all registered users.",
  
}
function ShowUser(){
    return(
        <>
        <Sidebar>
            <User/>
        </Sidebar>
        </>
    )
}
export default ShowUser