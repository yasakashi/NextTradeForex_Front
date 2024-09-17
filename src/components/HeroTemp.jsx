import Navbar from "./Navbar";

const HeroTemp = ({ children, needNav = true }) => {
  return (
    <div className="max-w-[1500px] bg-blue-light">
      <div>
        {needNav && <Navbar />}
        {children}
        <img
          className="w-full "
          src="/assets/hero-curve-layer1.svg"
          alt="background"
        />
      </div>
    </div>
  );
};

export default HeroTemp;
