import React from "react";

const ModalLayout = ({ open, onClose, children }) => {
  return (
    <div
      draggable={false} 
      onScroll={(e)=>{
        e.stopPropagation()
      }}
      onClick={(e) => {
        e.stopPropagation();
        // onClose?.();
      }}
      className={`
    fixed inset-0 flex justify-center items-center
    transition-colors
    ${open ? "visible bg-black/40" : "invisible"} 
    
    `}
      style={{
        zIndex: 10000,
        position: "fixed",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div  
      draggable={false} 

      onScroll={(e)=>{
        e.stopPropagation()
      }}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        style={{ zIndex: 100000 }}
        className={`bg-white rounded-md shadow transition-all
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
