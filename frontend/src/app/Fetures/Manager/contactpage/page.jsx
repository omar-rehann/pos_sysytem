import Sidebar from "../components/layot";
import Contact from "../components/contact";
export const metadata = {
  title: "Contact | Manager | POS System",
  description: "Get in touch with our team for support or questions.",
 
}

function ContactPage(){
    return(
        <>
         <Sidebar>

      <Contact />


    </Sidebar>
       
        </>

    )
}
export default ContactPage