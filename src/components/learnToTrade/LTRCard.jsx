import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CoverImage from "../../asset/img/placeholder (1).svg";

const LTRCard = ({ img, title = "", description = "", linkTo }) => {
  const navigate = useNavigate();

  return (
    <div className="sm:w-full  md:w-3/6 lg:w-2/6 px-4">
      <div
        className="flex flex-col  shadow-xl p-4  bg-blue-950 mb-4"
        style={{
          minHeight: 500,
          backgroundColor: "#020E51",
          paddingBottom: 32,
        }}
      >
        <div className="h-[250px] w-full overflow-hidden rounded-[6px]">
          <LazyLoadImage
            src={img ? img : CoverImage}
            effect="blur"
            alt="post Imgae"
            className=" z-50 w-full h-full rounded-lg hover:scale-105 transition-transform"
            width="100%"
            height="100%"
          />
        </div>
        <h5 className="text-[22px] font-bold text-gold-light_400 mt-4 h-[70px] overflow-hidden">
          {title}
        </h5>

        <h5 className="text-white text-[15px] font-normal h-[100px] overflow-hidden">
          {description ? description : null}
        </h5>

        <button
          onClick={linkTo}
          // to={`/learn_to_trade/courses/${item?.name}/${item?.value}`}
          className="w-max py-3 px-4 text-blue-dark font-normal bg-gradient-to-r from-[#F0D785] to-[#9C7049] mt-4 rounded-full relative overflow-clip shadow-lg outline-blue-dark"
        >
          <motion.div
            transition={{ ease: "linear", duration: 0.5 }}
            whileHover={{
              backgroundPosition: "50px 0px",
            }}
            style={{
              width: "100%",
              height: "100%",

              backgroundPosition: "350px 0px",
              backgroundImage:
                "linear-gradient(to right,rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0))",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></motion.div>
          Explore More
        </button>
      </div>
    </div>
  );
};

export default LTRCard;
