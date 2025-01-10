import { Link } from "react-router-dom";

const PendingCart = ({ item }) => {
  return (
    <div className="flex flex-col items-center justify-evenly  w-full h-[170px] max-w-[520px] bg-[#081257] rounded p-2.5">
      <h2 className="text-[17px] text-white font-medium leading-5">
        {item?.title}
      </h2>
      <span className="text-[22px] text-white font-medium leading-5">
        {item?.value}
      </span>
      <div>
        <Link
          className="bg-[#f3b66b] text-[#081257] py-2 px-5 rounded cursor-pointer"
          to={item?.href}
        >
          Click Now
        </Link>
      </div>
    </div>
  );
};

export default PendingCart;
