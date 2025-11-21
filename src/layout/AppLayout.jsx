import { Outlet } from "react-router-dom";
import AppHeader from "../components/common/AppHeader";
import Footer from "../components/common/Footer";

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <AppHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
export default AppLayout;
