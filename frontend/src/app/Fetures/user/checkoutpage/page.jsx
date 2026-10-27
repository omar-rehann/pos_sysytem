import Sidebar from "../components/layot"
import Check from "../components/check"
import Footer from "../components/footer"
export const metadata = {
  title: "Checkout | POS System",
  description: "Review your order and complete your payment securely.",
  robots: {
    index: false,
    follow: false,
  },
}
function Checkoutpage(){
    return(
        <>
        <Sidebar>
            <Check/>
            <Footer/>
        </Sidebar>
        </>
    )
}
export default Checkoutpage