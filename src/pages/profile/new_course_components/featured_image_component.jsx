import React, { useEffect, useState } from "react";
import NewCourceCard from "./new_cource_card";
import LibraryModal from "./library_modal";

const FeaturedImageComponent = ({ name, formik }) => {
  const [is_open, set_is_open] = React.useState(false);

  const [img, setImg] = useState(null);

  useEffect(() => {
    if (formik.values?.featuredImage) {
      setImg(URL.createObjectURL(formik.values?.featuredImage));
    }
  }, [formik.values?.featuredImage]);

  return (
    <NewCourceCard title={"Featured image"}>
      <div style={{ padding: "16px" }}>
        {img ? (
          <img
            className="object-cover h-[200px] w-full max-w-[220px] mx-auto"
            src={img}
            alt="Featured Image"
          />
        ) : null}

        {!img ? (
          <span
            className="text-blue-500 hover:underline pt-2"
            style={{ fontSize: 13, cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              set_is_open(true);
            }}
          >
            Set featured image
          </span>
        ) : (
          <span
            className="text-red-600 hover:underline"
            style={{ fontSize: 13, cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setImg(null);
              formik.setFieldValue("featuredImage", null);
            }}
          >
            Remove featured image
          </span>
        )}

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
