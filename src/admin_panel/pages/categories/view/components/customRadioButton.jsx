import React, { useId } from "react";

const CustomRadioButton = ({ checked, onChange, label, label_color, name }) => {
  const id = useId();

  return (
    <label className="flex cursor-pointer" style={{ width: "fit-content" }}>
      <input
        id={id}
        name={name}
        type="radio"
        value={label} // Value can still be passed from parent
        onChange={onChange}
        checked={checked}
        className="w-4 h-4 border border-blue-300 rounded bg-blue-50 focus:ring-3 focus:ring-blue-600 dark:bg-blue-700 dark:border-blue-600 dark:focus:ring-blue-600 dark:ring-offset-blue-800"
      />
      <div
        style={{
          color: label_color || "black",
          marginLeft: 6,
          fontSize: 13,
        }}
 
      >
        {label}
      </div>
    </label>
  );
};

export default CustomRadioButton;
