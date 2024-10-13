import { BeatLoader } from "react-spinners";

const CustomBeatLoader = ({ color = "#030c3b" }) => {
  const override = {
    display: "block",
    margin: " 0 auto",
    borderColor: "#030c3b",
  };

  return (
    <div>
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
