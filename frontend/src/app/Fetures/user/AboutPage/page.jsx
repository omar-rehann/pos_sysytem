import Sidebar from "../components/layot"
import About from "../components/about"
import PosterSection from "../components/poster"
import Footer from "../components/footer"
export const metadata = {
  title: "About | POS System",
  description: "Learn about our POS system: manage sales, inventory, invoices, and reports easily and quickly.",
  keywords: ["POS", "point of sale", "sales management", "inventory management", "invoices"],
  openGraph: {
    title: "About | POS System",
    description: "An all-in-one system for managing sales, inventory, and invoices.",
    type: "website",
    locale: "en_US",
  },
}
function Aboutpage(){
    return(
        <>
        <Sidebar>

         <About/>
         <PosterSection/>
         <Footer/>
            </Sidebar>
        </>
    )
}
export default Aboutpage