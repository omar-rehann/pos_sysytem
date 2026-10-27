import Sidebar from "../components/layot"
import Invoices from "../components/invoocies"
import Footer from "../components/footer"
export const metadata = {
  title: "Invoices | POS System",
  description: "View, search, and manage your invoices and sales records.",
 
}
function Invoicespage(){
    return(
        <>
        <Sidebar>
            <Invoices/>
            <Footer/>
        </Sidebar>
        </>
    )
}
export default Invoicespage