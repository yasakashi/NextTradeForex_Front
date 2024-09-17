const PartnershipItem = ({ title, options, name, handleChange, value }) => {
  return (
    <div>
      <h4 className="text-sm text-gold-light_400 font-semibold my-2">
        {title}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-2 border-b border-[#ffffff12] pb-5">
        {options?.map((option, index) => (
          <div key={index} className="flex items-center gap-1 cursor-pointer">
            <input
              name={name}
              onChange={handleChange}
              value={option.id}
              type="checkbox"
            />
            <label className="text-white text-sm">{option?.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnershipItem;
