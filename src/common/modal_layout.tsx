import { Dialog, DialogContent } from "@mui/material";
import React from "react";

const ModalLayout = ({
  open,
  onClose,
  children,
  width,
  style,
}: {
  open?: boolean;
  onClose?: (val: boolean) => void;
  children?: React.ReactNode;
  width?: "xl" | "md" | "lg" | "sm" | "xs";
  style?: React.CSSProperties;
}) => {
  return (
    <Dialog
      open={!!open} 
      className="transition-all"

      onClose={() => {
        onClose?.(false);
      }}
      style={{
        maxHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      }}
      fullWidth
      maxWidth={width || "xl"}
    >
      <DialogContent 
      className="transition-all"
        style={{
          padding: 0,
          height: "fit-content",
          width: "100%",
          overflow: "hidden", 
          transition:"0.2s",
          ...style,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalLayout;
