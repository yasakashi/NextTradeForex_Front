const CustomBtnLg = ({ title, text = "text-lg" }) => {
  return (
    <button
      className={`bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] shadow-xl px-4 py-2 rounded-lg text-blue-dark ${text}`}
    >
      {title}
    </button>
  );
};

export default CustomBtnLg;
