import Sidebar from "../components/layot"
import ShowCategorey from "../components/showcategorey"
export const metadata = {
  title: "All Categories",
  description: "View and manage all store categories",
}
function ShowCategoreypage(){
    return(
        <>
        <Sidebar>
            <ShowCategorey/>
        </Sidebar>
        </>
    )
}
export default ShowCategoreypage