import Sidebar from "../components/layot"
import Services from "../components/allservices"
import FeaturesGrid from "../components/whychoose"
import Footer from "../components/footer"

export const metadata = {
  title: "Our Services | POS System",
  description: "Explore our POS services: sales management, inventory tracking, invoicing, reporting, and customer support.",
  keywords: ["POS services", "sales management", "inventory tracking", "invoicing", "reports", "support"],
  openGraph: {
    title: "Our Services | POS System",
    description: "Everything you need to run your business: sales, inventory, invoices, and reports.",
    type: "website",
    locale: "en_US",
  },
}

function AllServices(){
   

    return(
       <Sidebar>
      <Services />

      <FeaturesGrid />

      <Footer />

    </Sidebar>
         
       
    )
}
export default AllServices