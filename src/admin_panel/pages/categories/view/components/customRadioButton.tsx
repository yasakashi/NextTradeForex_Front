import React, { useId } from "react";

const CustomRadioButton = ({
  checked,
  onchange,
  label,
  label_color,
}: {
  checked?: boolean;
  label_color?: string;
  label: string;
  onchange?: (val: any) => void;
}) => {
  const id = useId();
  return (
    <div className="flex" style={{width:"fit-content"}}>
      <input
        name={id}
        type="radio"
        onChange={(e) => {
          onchange?.(e.target.value);
        }}
        checked={checked}
        className="w-4 h-4 border border-blue-300 rounded bg-blue-50 focus:ring-3 focus:ring-blue-600 dark:bg-blue-700 dark:border-blue-600 dark:focus:ring-blue-600 dark:ring-offset-blue-800"
      />

      <label
        style={{
          color: label_color ? label_color : "black",
          marginLeft: 6,
          fontSize: 13,
        }}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomRadioButton;
