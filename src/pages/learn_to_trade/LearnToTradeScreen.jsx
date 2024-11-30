import React from "react";
import addanced from "../../asset/img/advance.png";
import intermidiate from "../../asset/img/intermidiate.png";
import newBie from "../../asset/img/newbie.png";
import LTRCard from "../../components/learnToTrade/LTRCard";
import { useNavigate } from "react-router-dom";

const LearnToTradeScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex mt-12 flex-wrap">
      {[
        { img: newBie, title: "Newbie", route: "", value: 1, name: "newbie" },
        {
          img: intermidiate,
          title: "Intermidiate",
          value: 2,
          name: "intermediate",
        },
        { img: addanced, title: "Advanced", value: 3, name: "advanced" },
      ].map((item, i) => {
        return (
          <LTRCard
            key={i}
            img={item?.img}
            title={item?.title}
            linkTo={() =>
              navigate(`/learn_to_trade/${item?.name}`, {
                state: {
                  levelId: item?.value,
                },
              })
            }
          />
        );
      })}
    </div>
  );
};

export default LearnToTradeScreen;
