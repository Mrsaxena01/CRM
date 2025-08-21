import React from "react";
import { useSidebar } from "../context/SidebarContext";
import Navbar from "./Navbar";
import Slider from "./Slider";
import Footer from "./Footer";

function Layout({ children }) {
  const { isOpen } = useSidebar();

  return (
    <div className="h-auto flex">
      {/* Sidebar (fixed left) */}
      <Slider />

      {/* Main Content Area */}
      <div
        className={`flex z-50 flex-col transition-all duration-300 ease-in-out
          ${isOpen ? "ml-64 w-[calc(100%-16rem)]" : "ml-16 w-[calc(100%-4rem)]"}`}
      >
        {/* Navbar (fixed top) */}
        <Navbar />

        {/* Main Content (scrollable area) */}
        <main className="flex-1 mt-2 mb-12 p-6 overflow-y-auto">
          {children}
        </main>

        {/* Footer (fixed bottom) */}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
