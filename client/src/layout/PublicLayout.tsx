import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="w-full flex flex-col items-center justify-between">
      <div className="w-full px-3 md:px-5">
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
