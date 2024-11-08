import React from "react";
import classNames from "classnames";

// Define button variants and sizes using TailwindCSS classes
const buttonVariants = {
  default: "bg-[#1976d2] text-white hover:bg-[#1565c0]",
  destructive: "bg-red-600 text-white hover:bg-red-500",
  outline: "border border-gray-300 bg-white hover:bg-gray-100",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  ghost: "bg-transparent hover:bg-gray-100",
  link: "text-blue-600 underline hover:text-blue-800",
  remove:
    "text-red-600 border border-red-600 hover:bg-red-600 hover:text-white",
  outlined:
    "text-[#1976d2] bg-white hover:bg-[#1976d2] border border-[#1976d2] rounded-md hover:text-white outline-none",
};

const buttonSizes = {
  default: "h-10 px-4 py-2 font-normal",
  sm: "px-3 py-2 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-8 py-3 text-lg",
  icon: "w-10 flex items-center justify-center",
};

const CustomButton = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      type = "submit",
      ...props
    },
    ref
  ) => {
    const Component = asChild ? "span" : "button";

    const classes = classNames(
      "inline-flex items-center justify-center rounded-[4px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm cursor-pointer",
      buttonVariants[variant],
      buttonSizes[size],
      className // Allow custom class names to be passed in
    );

    return <Component ref={ref} type={type} className={classes} {...props} />;
  }
);

CustomButton.displayName = "Button";

export { CustomButton };
