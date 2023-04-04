import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
//==============================================

function MainLayout({ children }) {

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="font-mono mx-6 md:max-w-4xl md:mx-auto">
        {children}
        <ToastContainer limit={1}/>
      </div>
    </main>
  );
}

export default MainLayout;
