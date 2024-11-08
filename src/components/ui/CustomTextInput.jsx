import classNames from "classnames";

const CustomTextInput = ({
  name,
  value = "",
  onChange,
  placeholder,
  type = "text",
  error,
  onBlur = () => {},
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
        onBlur={onBlur}
        placeholder={placeholder}
        className={classNames(
          "w-full border border-gray-300 px-4 py-2 outline-blue-500 rounded-lg text-sm placeholder:text-gray-400",
          className
        )}
        {...props}
      />

      {error ? <span className="text-red-600 text-sm p-1">{error}</span> : null}
    </div>
  );
};

export default CustomTextInput;
