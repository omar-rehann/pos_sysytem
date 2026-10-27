import Sidebar from "../components/layot"
import ShowStore from "../components/showstore"
export const metadata = {
  title: "All Stores",
  description: "View and manage all your stores",
}
function showstorepage(){
    return(
        <>
        <Sidebar>
            <ShowStore/>
        </Sidebar>
        </>
    )
}
export default showstorepage