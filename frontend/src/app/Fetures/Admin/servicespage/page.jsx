import Sidebar from "../components/layot"
import Services from "../components/services"
export const metadata = {
  title: "Services",
  description: "Manage and view all available services",
}
function Servicespage(){
    return(
        <>
        <Sidebar>
            <Services/>
        </Sidebar>
        </>
    )
}
export default Servicespage