import { Link, useLocation } from "react-router-dom";

function Category() {
  const location = useLocation();

  const categories = [
    { label: "Forex", to: "/market-pulse/forex" },
    { label: "Commodities", to: "/market-pulse/commodities" },
    { label: "Indices", to: "/market-pulse/indices" },
    { label: "Crypto", to: "/market-pulse/crypto" },
    { label: "Stocks", to: "/market-pulse/stocks" },
    { label: "Charting", to: "/market-pulse/charting" },
    { label: "Strategy", to: "/market-pulse/strategy" },
  ];

  return (
    <div className="mx-auto z-[1] flex items-center flex-wrap justify-center gap-[15px]">
      {categories.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <button
            key={item.label}
            className={`px-2 lg:px-4 py-2 rounded-3xl ${
              isActive
                ? "bg-gradient-to-b from-[#5f8cbb] via-[#85a8f0] to-[#49679c]"
                : "bg-gradient-to-b from-[#bb965f] via-[#f0d785] to-[#9c7049]"
            }`}
          >
            <Link to={item.to}>{item.label}</Link>
          </button>
        );
      })}
    </div>
  );
}

export default Category;
