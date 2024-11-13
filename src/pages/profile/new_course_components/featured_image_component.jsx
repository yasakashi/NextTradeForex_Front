import React from "react";
import NewCourceCard from "./new_cource_card";
import LibraryModal from "./library_modal";

const FeaturedImageComponent = ({ name, formik }) => {
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
        {formik.touched.featuredImage && formik.errors.featuredImage ? (
          <div className="text-red-600 text-sm p-1">
            {formik.errors.featuredImage}
          </div>
        ) : null}
        <LibraryModal
          accept_file="Image"
          has_side_bar_action={false}
          open={is_open}
          set_open={set_is_open}
          title="Featured image"
          file={formik?.values?.featuredImage}
          set_file={(file) => {
            formik.setFieldValue("featuredImage", file);
          }}
          onBlur={formik.handleBlur}
          onSave={(val) => {
            set_is_open(false);
          }}
        />
      </div>
    </NewCourceCard>
  );
};

export default FeaturedImageComponent;
