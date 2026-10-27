import Sidebar from "../components/layot"
import Allinvooceis from "../components/sales"
export const metadata = {
  title: "Manager Invoices",
  description: "View and manage sales invoices for your store",
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