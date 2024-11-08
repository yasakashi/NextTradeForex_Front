import { CircleLoader } from "react-spinners";

const CustomCircleLoader = () => {
  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#7e8594",
  };
  const color = "#6f62fc";
  return (
    <div className="">
      <CircleLoader
        loading={true}
        color={color}
        size={200}
        speedMultiplier={1}
        cssOverride={override}
      />
    </div>
  );
};

export default CustomCircleLoader;
