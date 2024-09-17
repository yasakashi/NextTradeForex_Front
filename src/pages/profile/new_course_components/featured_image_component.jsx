import React from "react";
import ModalLayout from "../../../common/modal_layout";
import NewCourceCard from "./new_cource_card";
import { GrClose } from "react-icons/gr";
import { CgClose } from "react-icons/cg";
import BootstrapTabs from "../../../common/bootstrap_tabs";
import LibraryModal from "./library_modal";

const FeaturedImageComponent = () => {
  const [is_open, set_is_open] = React.useState(false);
  const [current_tab, set_current_tab] = React.useState("upload");
  return (
    <NewCourceCard title={"Featured image"}>
      <div style={{ padding: "16px" }}>
        <a
          className="text-blue-500"
          style={{ fontSize: 13, cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            set_is_open(true);
          }}
        >
          Set featured image
        </a>
        <LibraryModal
          has_side_bar_action={false}
          open={is_open}
          set_open={set_is_open}
          title="Featured image"
        />
      </div>
    </NewCourceCard>
  );
};

export default FeaturedImageComponent;
