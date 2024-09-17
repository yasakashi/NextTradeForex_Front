const MainBannerTitle = ({ title, subRoute }) => {
  const subRoutes = ["Home"];

  subRoutes.push(subRoute);

  return (
    <div className="w-full flex items-center justify-center pt-14 mb-4">
      <div>
        <h2 className="text-3xl font-semibold mb-5">{title}</h2>
        <div>
          <ol className="flex items-center flex-wrap gap-2">
            {subRoutes.map((route, index) => {
              if (subRoutes.length !== index + 1) {
                return (
                  <li key={index} className="text-gold-light_400">
                    <a href="/">{route}</a>
                  </li>
                );
              } else {
                return (
                  <li key={index} className="text-[#6c757d] capitalize">
                    <span className="mr-2">/</span>
                    <a href="/" className="cursor-text">{route}</a>
                  </li>
                );
              }
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MainBannerTitle;
