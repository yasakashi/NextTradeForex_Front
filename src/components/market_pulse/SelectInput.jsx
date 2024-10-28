function SelectInput({ options, value, onChange, placeholder }) {
  return (
    <div className="mt-[5px]">
      <select
        value={value ? value.id : ""}
        onChange={(e) => {
          console.log();
          onChange(e.target.value);
        }}
        className="bg-gold-light_200 w-full text-sm px-[3px] py-[2px]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name} {/* Display the name from the API */}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
