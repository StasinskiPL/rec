import React from "react";

const Header = ({ title }) => {
  return (
    <header>
      <h2 className="text-center">{title || "Dashboard"}</h2>
    </header>
  );
};

export default Header;
