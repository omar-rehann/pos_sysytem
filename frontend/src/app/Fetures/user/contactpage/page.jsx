import Sidebar from "../components/layot";
import Contact from "../components/contact";
import Footer from "../components/footer"
export const metadata = {
  title: "Contact Us | POS System",
  description: "Get in touch with our team for support, questions, or a demo of our POS system.",
  keywords: ["contact", "support", "POS system", "customer service", "demo"],
  openGraph: {
    title: "Contact Us | POS System",
    description: "Have a question or need help? Reach out to our team.",
    type: "website",
    locale: "en_US",
  },
}
function ContactPage(){
    return(
        <>
         <Sidebar>

      <Contact />

      <Footer />

    </Sidebar>
       
        </>

    )
}
export default ContactPage