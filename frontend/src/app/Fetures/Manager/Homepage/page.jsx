import Sidebar from "../components/layot"
import Analysis from "../components/analysis"
export const metadata = {
  title: "Dashboard | Manager | POS System",
  description: "Overview of sales, orders, stores, and products.",
  
}
function Homepage(){
    return(
        <>
        <Sidebar>
            <Analysis/>
        </Sidebar>
        </>
    )

}
export default Homepage