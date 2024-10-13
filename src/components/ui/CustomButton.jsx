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
  outlined:
    "text-[#1976d2] bg-white hover:bg-[#1976d2] border border-[#1976d2] rounded-md hover:text-white",
};

const buttonSizes = {
  default: "h-10 px-4 py-2 font-normal",
  sm: "h-9 px-2 py-1 text-xs",
  lg: "h-11 px-8 py-3 text-lg",
  icon: "h-10 w-10 flex items-center justify-center",
};

const CustomButton = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? "span" : "button";

    const classes = classNames(
      "inline-flex items-center justify-center rounded-[4px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm",
      buttonVariants[variant],
      buttonSizes[size],
      className // Allow custom class names to be passed in
    );

    return <Component ref={ref} className={classes} {...props} />;
  }
);

CustomButton.displayName = "Button";

export { CustomButton };
