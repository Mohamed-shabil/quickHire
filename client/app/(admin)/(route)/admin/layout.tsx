import Navbar from "@/components/Admin/Navbar";
const AdminLayout = ({ children } : { children : React.ReactNode}) => {
    return ( 
        <div className="h-full flex flex-col">
            <Navbar/>
            <div>
                {children}
            </div>
        </div>
     );
}
 
export default AdminLayout;