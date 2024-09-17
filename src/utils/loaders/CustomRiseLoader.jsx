import { RiseLoader } from "react-spinners";

const CustomRiseLoader = ({
  color = "#030c3b",
  backgroundColor = "#030c3b",
}) => {
  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: backgroundColor,
  };

  return (
    <div className="">
      <RiseLoader
        loading={true}
        color={color}
        width={100}
        speedMultiplier={1}
        height={100}
        cssOverride={override}
      />
    </div>
  );
};

export default CustomRiseLoader;
