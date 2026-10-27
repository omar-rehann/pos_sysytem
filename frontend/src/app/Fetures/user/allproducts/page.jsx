import Sidebar from "../components/layot"
import Products from "../components/product"
import Footer from "../components/footer"
export const metadata = {
  title: "All Products | POS System",
  description: "Browse all products in your POS system: view prices, stock levels, and categories in one place.",
  keywords: ["products", "inventory", "POS", "product list", "stock", "prices"],
  openGraph: {
    title: "All Products | POS System",
    description: "Browse and manage all your products, prices, and stock levels.",
    type: "website",
    locale: "en_US",
  },
}

function Allproduct(){
    return(
        <>
         <Sidebar>
            <Products/>
                
                <Footer />

    </Sidebar>

        </>
    )
}
export default Allproduct