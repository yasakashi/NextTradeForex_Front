import React from "react";
import { motion } from "framer-motion";

import { connect } from "react-redux";
import store from "../redux/store";
import { show_message } from "../redux/features/generalSlice";
import { useTheme } from "@mui/material";

interface Props {
  message: { color?: string; mode?: boolean; message?: string };
}
const MessageSnackbar = ({ message }: Props) => {
  const color = colors.find((item) => item.type === message?.color); 
  const theme = useTheme() 
  console.log({message});
  
  return (
    <motion.div
      onAnimationComplete={async () => {
        try {
          await new Promise<void>((res) => {
            setTimeout(() => {
              res();
            }, 2000);
          });
          store.dispatch(
            show_message({
              mode: false,
              color: message.color,
              message: message.message,
            })
          );
        } catch (error) {
          /* empty */
          console.log("error ===========> ")
        }
      }}
      className="energy"
      animate={{ translateX: message.mode ? 0 : "-150vw" }}
      transition={{ duration: 0.4, bounce: 0.2 }}
      style={{
        position: "fixed",
        bottom: 24,
        width: "fit-content",
        padding: "8px 16px",
        borderRadius: 4,
        left: 24,
        backgroundColor: color?.color,
        color: "black", 
        zIndex:theme.zIndex.drawer+2
      }}
    >
      {message?.message}
    </motion.div>
  );
};
const state = (props: any) => {
  const { general } = props;
  const { message } = general;

  return { message };
};

const Component = connect(state)(MessageSnackbar);
export default Component;

const colors = [
  { type: "success", color: "#34eb61" },
  { type: "error", color: "#eb3440" },
  { type: "info", color: "#228ef2" },
];
