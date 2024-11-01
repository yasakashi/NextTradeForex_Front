import { useRef, useState } from "react";

const Expandable = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-[3px] border overflow-auto my-[10px]">
      <div onClick={toggle} className="flex items-center justify-between p-[10px] bg-white cursor-pointer font-bold">
        {title}
        <span
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          ▶
        </span>
      </div>
      <div
        ref={contentRef}
        style={{
          height: isOpen ? contentRef.current.scrollHeight : 0,
          overflow: "auto",
          transition: "height 0.3s ease",
        }}
      >
        <div className="rounded-[5px]">{children}</div>
      </div>
    </div>
  );
};

export default Expandable;
