import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const SupportPortal = () => {
  return (
    <div>
      <Navbar />
      <main className="max_w_main mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SupportPortal;
