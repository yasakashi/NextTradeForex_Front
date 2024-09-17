import React from "react";
// import { Tabs, Tab } from "react-bootstrap";
//  import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
const BootstrapTabs = ({
  items,
  onClick,
  current_tab, disable_padding
}: {
  items: { title: string,disabled?:boolean }[]; 
  disable_padding?:boolean
  onClick: (item: any) => void;

  current_tab: string;
}) => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: 8,
        padding:!disable_padding ?"0px 16px" :0,
        // borderBottom: "1px solid #999",
        position: "relative",
      }}
    >
      {items.map((item, i) => (
        <motion.button 
        disabled={item.disabled}
          key={i}
          onClick={() => onClick(item.title)}
          style={{
            padding: 8,
            fontSize: 13,
            border: "1px solid rgba(0,0,0,0)",
          }}
          animate={{
            borderLeftColor:
              current_tab === item.title ? "#999" : "rgba(0,0,0,0)",
            borderTopColor: current_tab === item.title ? "#999" : "rgba(0,0,0,0)",
            borderRightColor:
              current_tab === item.title ? "#999" : "rgba(0,0,0,0)",
            // borderBottomColor:
            //   current_tab === item.title ? "transparent" : "#999",
            boxShadow:
              current_tab === item?.title
                ? `0px 1px 0px #fff, 0px 1px 0px #999`
                : "none",
            //   boxShadow:
            //     categories_type === "all"
            //       ? `0px 1px 0px #fff, 0px 0px 1px #000`
            //       : "none",
            //   borderBottomColor:
            //     categories_type === "all" ? "white" : "transparent",
            color: current_tab === item?.title ? "#21759b" : "rgba(0,0,0,1)",
          }}
        >
          {item.title}
        </motion.button>
      ))}
    </div>
  );
};

export default BootstrapTabs;
