import { useState, useEffect } from "react";
import { MenuItem, Select, useTheme } from "@mui/material";

export const CustomSelectBox = ({
  containerWidth,
  hideSearch,
  fullWidth,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [level, setLevel] = useState(options?.[0] || { title: "", value: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    onChange?.(level.value);
  }, [level, onChange]);

  const theme = useTheme();

  return (
    <Select
      fullWidth={fullWidth === undefined ? true : fullWidth}
      size="small"
      value={level?.value}
      variant="outlined"
      onChange={(e) => {
        const item = options?.find((item) => item.value === e.target.value);
        setLevel(item || { title: "", value: "" });
      }}
    >
      {options?.map((item, i) => (
        <MenuItem value={item.value} key={i}>
          {item.title}
        </MenuItem>
      ))}
    </Select>
  );
};

export const MySelectBox = ({ fullWidth, options, onChange, value, style }) => {
  const theme = useTheme();

  return (
    <Select
      style={{ ...style }}
      fullWidth={fullWidth === undefined ? true : fullWidth}
      size="small"
      value={value}
      variant="standard"
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    >
      {options?.map((item, i) => (
        <MenuItem value={item.value} key={i}>
          {item.title}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelectBox;
