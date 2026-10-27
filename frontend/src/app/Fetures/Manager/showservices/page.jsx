import Sidebar from "../components/layot"
import Showservices from "../components/showservices"
export const metadata = {
  title: "All Services",
  description: "View and manage all Services",
}
function Showservicespage(){
    return(
        <>
        <Sidebar>
            <Showservices/>
        </Sidebar>
        </>
    )
}
export default Showservicespage