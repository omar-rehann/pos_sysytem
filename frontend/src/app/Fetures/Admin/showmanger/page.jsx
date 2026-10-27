import Sidebar from "../components/layot"
import ShowManger from "../components/showmanger"
export const metadata = {
  title: "Managers",
  description: "View and manage all store managers",
}
function ShowMangerpage(){
    return(
        <>
        <Sidebar>
            <ShowManger/>
        </Sidebar>
        </>
    )
}
export default ShowMangerpage