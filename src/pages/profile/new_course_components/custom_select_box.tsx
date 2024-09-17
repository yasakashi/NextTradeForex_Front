import React, { memo } from "react";

import { MenuItem, Select, useTheme } from "@mui/material";
export const CustomSelectBox = ({
  container_width,
  hide_search,
  fullWidth,
  options,
  onChange,
}: {
  container_width?: number | string;
  hide_search?: boolean;
  options?: { title: string; value?: string | number }[];
  onChange?: (val: any) => void;
  fullWidth?: boolean;
}) => {
  const [is_open, set_is_open] = React.useState(false);
  const [level, set_level] = React.useState(
    options?.[0] || { title: "", value: "" }
  );
  const [search, set_search] = React.useState("");
  React.useEffect(() => {
    onChange?.(level.value);
  }, [level]);
  const theme = useTheme();
  return (
    <Select
      fullWidth={fullWidth === undefined ? true : fullWidth}
      size="small"
      value={level?.value}
      variant="outlined"
      onChange={(e:any) => {
        const item = options?.find((item) => item.value === e.target.value);
        set_level(item || { title: "", value: "" });
      }}
    >
      {options?.map((item, i) => {
        return (
          <MenuItem value={item.value} key={i}>
            {item.title}
          </MenuItem>
        );
      })}
    </Select>
  );
};
export const MySelectBox = ({
  fullWidth,
  options,
  onChange,
  value,style
}: {
  value: any;
  container_width?: number | string;
  hide_search?: boolean;
  options?: { title: string; value?: string | number }[];
  onChange?: (val: any) => void;
  fullWidth?: boolean; 
  style?:React.CSSProperties
}) => {
  const theme = useTheme();
  return (
    <Select 
    style={{...style}}
      fullWidth={fullWidth === undefined ? true : fullWidth}
      size="small"
      value={value}
      variant="standard"
      onChange={(e:any) => {
        onChange?.(e.target.value);
      }}
    >
      {options?.map((item, i) => {
        return (
          <MenuItem value={item.value} key={i}>
            {item.title}
          </MenuItem>
        );
      })}
    </Select>
  );
};
export default CustomSelectBox;
