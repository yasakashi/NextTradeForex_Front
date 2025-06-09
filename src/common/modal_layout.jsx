import React from "react";

const ModalLayout = ({ open, className = "", children }) => {
  return (
    <div
      draggable={false}
      className={`
          fixed inset-0 flex justify-center items-center transition-colors z-[1004] w-screen h-screen
          ${open ? "visible bg-black/40 z-[1005]" : "invisible"} 
    `}
    >
      <div
        draggable={false}
        className={`bg-white shadow-md mt-[50px] max-h-[90vh] max-w-[1000px] overflow-y-scroll scrollbar-none rounded-3xl transition-all z-[1006] ${className} 
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
