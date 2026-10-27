import Sidebar from "../components/layot"
import Showpopular from "../components/showpopular"
export const metadata = {
  title: "Popular Items",
  description: "View and manage all popular items in your store",
}
function Showpopularpage(){
    return(
        <>
        <Sidebar>
            <Showpopular/>
        </Sidebar>
        </>
    )
}
export default Showpopularpage