import Sidebar from "../components/layot"
import HeroSection from "../components/hero"
import Store from "../components/store"
import Popular from "../components/popular"
import Service from "../components/services"
import Footer from "../components/footer"
export const metadata = {
  title: "POS System | Manage Sales, Inventory & Invoices",
  description: "A complete POS system to manage your sales, inventory, and invoices easily. Browse popular products and explore our services.",
  keywords: ["POS", "point of sale", "sales management", "inventory", "invoices", "online store"],
  openGraph: {
    title: "POS System | Manage Sales, Inventory & Invoices",
    description: "A complete POS system to manage your sales, inventory, and invoices easily.",
    type: "website",
   
  },
  
}
function Homepage(){
    return(
        <>
          <Sidebar>
            <HeroSection/>
                <Store />
                <Popular />
                <Service />
                <Footer />

    </Sidebar>
        </>
    )
}
export default Homepage