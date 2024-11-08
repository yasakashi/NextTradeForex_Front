const CustomCheckbox = ({ name, checked, className = "", onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        name={name}
        type="checkbox"
        checked={checked}
        className={`sr-only peer ${className}`}
        onChange={(e) => {
          e.stopPropagation();
          onChange(e);
        }}
      />
      <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-600 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};

export default CustomCheckbox;
