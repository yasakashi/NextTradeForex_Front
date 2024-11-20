import React from "react";
import addanced from "../../asset/img/advance.png";
import intermidiate from "../../asset/img/intermidiate.png";
import newBie from "../../asset/img/newbie.png";
import { DetailsCart } from "../../admin_panel/pages/categories/view/category_details_view_screen";


const SelectLearnToTrade = () => {


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
          <DetailsCart
            key={i}
            index={i}
            img={item.img}
            title={item.title}
            item={item}
            hide_descr
          />
        );
      })}
    </div>
  );
};

export default SelectLearnToTrade;
