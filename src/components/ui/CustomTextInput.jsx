import classNames from "classnames";

const CustomTextInput = ({
  name,
  value = "",
  onChange,
  placeholder,
  type = "text",
  error,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classNames(
          "w-full border border-gray-300 px-4 py-2 outline-blue-500 rounded-lg text-sm placeholder:text-gray-400",
          className
        )}
        {...props}
      />

      {error ? <span>{error}</span> : null}
    </div>
  );
};

export default CustomTextInput;
