import React from "react";

const CardLayout = ({ children }) => {
  return (
    <div className="mt-5 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-200">
      {children}
    </div>
  );
};

export default CardLayout;
