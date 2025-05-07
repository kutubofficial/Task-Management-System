import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-4 mb-4 px-4 max-w-6xl">
        {children}
      </div>
    </>
  );
};

export default Layout;
