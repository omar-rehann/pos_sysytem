import Sidebar from "../components/layot"
import Addpop from "../components/addpopular"
export const metadata = {
  title: "Add Popular",
  description: "Add a new popular item to your store",
}
function Addpopularpage(){
    return(
        <>
        <Sidebar>
            <Addpop/>
        </Sidebar>
        </>
    )
}
export default Addpopularpage