import classNames from "classnames";

const CustomTextArea = ({
  name,
  value = "",
  onChange,
  placeholder,
  error,
  className,
  onBlur,
  ...props
}) => {
  return (
    <div className="w-full">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={classNames(
          "w-full border border-gray-300 px-4 py-2 outline-blue-500 rounded-lg text-sm placeholder:text-gray-400",
          className
        )}
        {...props}
      ></textarea>

      {error
        ? <span className="text-red-600 text-sm p-1">{error}</span> : null}
    </div>
  );
};

export default CustomTextArea;
