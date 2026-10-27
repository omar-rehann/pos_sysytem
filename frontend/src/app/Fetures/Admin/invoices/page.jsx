import Sidebar from "../components/layot"
import Allinvooceis from "../components/sales"
export const metadata = {
  title: "Invoices",
  description: "View and manage all sales invoices",
}
function Invociespage(){
    return(
        <>
        <Sidebar>
            <Allinvooceis/>
        </Sidebar>
        </>
    )


}
export default Invociespage