import React from "react";
import ModalLayout from "../../../common/modal_layout";
import NewCourceCard from "./new_cource_card";
import { GrClose } from "react-icons/gr";
import { CgClose } from "react-icons/cg";
import BootstrapTabs from "../../../common/bootstrap_tabs";
import LibraryModal from "./library_modal";
import { upload_course_cover_api } from "../service/upload_course_cover_api";

const FeaturedImageComponent = ({
  file,
  set_file,
}: {
  file?: File | null;
  set_file?: (file: File) => void;
}) => {
  const [is_open, set_is_open] = React.useState(false);

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
        accept_file="Image"
          file={file}
          set_file={set_file}
          has_side_bar_action={false}
          open={is_open}
          onSave={(img) => {
            if (img) set_file?.(img);
            set_is_open(false);
          }}
          set_open={set_is_open}
          title="Featured image"
        />
      </div>
    </NewCourceCard>
  );
};

export default FeaturedImageComponent;
