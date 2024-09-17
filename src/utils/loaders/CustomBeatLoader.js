import { BeatLoader } from "react-spinners";

const CustomBeatLoader = () => {
  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#030c3b",
  };
  const color = "#030c3b";
  return (
    <div className="">
      <BeatLoader
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

export default CustomBeatLoader;
