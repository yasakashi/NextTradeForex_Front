import React from "react";
import addanced from "../../asset/img/advance.png";
import intermidiate from "../../asset/img/intermidiate.png";
import newBie from "../../asset/img/newbie.png";
import { DetailsCart } from "../../admin_panel/pages/categories/view/category_details_view_screen";
import { useNavigate } from "react-router-dom";
const SelectLearnToTrade = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex mt-12 flex-wrap">
      {[
        { img: newBie, title: "Newbie", route: "", value: 1 },
        { img: intermidiate, title: "Intermidiate", value: 2 },
        { img: addanced, title: "Advanced", value: 3 },
      ].map((item, i) => {
        return (
          <DetailsCart
            key={i}
            index={i}
            img={item.img}
            title={item.title}
            hide_descr
            onClick={() => {
              navigate(`/learn_to_trade/courses/${item.value}`);
            }}
          />
        );
      })}
    </div>
  );
};

export default SelectLearnToTrade;
