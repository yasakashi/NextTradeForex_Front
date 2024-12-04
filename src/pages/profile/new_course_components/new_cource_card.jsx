import React, { useState } from "react";
import ArrowTriangle from "../../../asset/img/play-button-arrow.svg";
import arrow from "../../../asset/img/arrow-bold.svg";
import { motion } from "framer-motion";

const NewCourceCard = ({ children, title, set_cource_items, style }) => {
  const [is_open, set_is_open] = useState(true);
  return (
    <div
      style={{
        ...style,
        overflow: "hidden",
        border: "1px solid #ccd0d4",
      }}
      className="custom_card"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          set_is_open((pre) => !pre);
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 16px",
          paddingTop: 4,
        }}
      >
        <h4 className="text-sm font-medium text-gray-[#444]">{title}</h4>
        <div
          style={{
            display: "flex",
            width: "fit-content",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row-reverse",
          }}
        >
          <motion.button
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: 24,
              height: "35px",
              alignItems: "center",
            }}
            // onClick={() => {
            //   set_is_open((pre) => !pre);
            // }}
          >
            <motion.img
              whileTap={{ scale: 1.1 }}
              animate={{ rotateY: is_open ? 180 : 0 }}
              src={ArrowTriangle}
              width={8}
              height={8}
              style={{ userSelect: "none", rotate: 90 }}
              alt=""
            />
          </motion.button>
          <motion.button
            onClick={() => {}}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: 24,
              height: "35px",
              alignItems: "center",
            }}
          >
            <img
              src={arrow}
              width={12}
              height={8}
              alt=""
              style={{ transform: "rotateX(180deg)", userSelect: "none" }}
            />
          </motion.button>
          <motion.button>
            <img
              src={arrow}
              width={12}
              height={8}
              alt=""
              style={{ userSelect: "none" }}
            />
          </motion.button>
        </div>
      </div>
      <div
        style={{ width: "100%", height: 1, backgroundColor: "#c3c4c7" }}
      ></div>
      <motion.div
        style={{ width: "100%" }}
        initial={{ height: 0 }}
        animate={{ height: is_open ? "fit-content" : 0 }}
        transition={{ duration: 0.23 }}
      >
        <div style={{ width: "100%", overflow: "visible" }}>{children}</div>
      </motion.div>
    </div>
  );
};

export default NewCourceCard;

export const CustomDivider = () => {
  return (
    <div style={{ width: "100%", height: 1, backgroundColor: "#c3c4c7" }}></div>
  );
};
