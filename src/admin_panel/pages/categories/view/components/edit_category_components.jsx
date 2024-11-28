import React from "react";

import LibraryModal from "../../../../../pages/profile/new_course_components/library_modal";
import BorderedButtonPrimary from "../../../../../common/bordered_button_primary";
// import EditorComponent from "../../../../../pages/profile/new_course_components/editor/editor_component";
import CustomRadioButton from "./customRadioButton";
import ContainedButtonPrimary from "../../../../../common/contained_button_primary";
import { data_list } from "../../../../components/table/material_table";
import DraftEditor from "../../../../components/editor/draft_editor";
import { GroupedSelectBox } from "./add_new_category_component";
import useCategories from "../../hook/use_categories";
import CustomTextInput from "../../../../../components/ui/CustomTextInput";
import CustomTextArea from "../../../../../components/ui/CustomTextArea";
import { useParams } from "react-router-dom";

const EditCategoryComponent = () => {
  const { id } = useParams();

  const { categories } = useCategories({ make_id_tree: true });
  const [open, set_open] = React.useState(false);

  return (
    <div className="py-16 w-full px-8 sm:w-[80%] md:w-[70%] mx-auto text-white">
      <h4 className="mb-6 text-2xl">Edit Category</h4>

      <div className="mt-4">
        <h4 className="text-sm mb-1">Name</h4>
        <CustomTextInput placeholder="Category name" />
      </div>
      <div className="mt-8">
        <div className="mt-4">
          <h4 className="text-sm mb-1">Slug</h4>
          <CustomTextInput placeholder="Slug" />
        </div>
        <h6 className="text-xs">
          The “slug” is the URL-friendly version of the name. It is usually all
          lowercase and contains only letters, numbers, and hyphens.
        </h6>
      </div>
      <div className="text-black">
        <h5 className="mt-8 text-white">Parent Category</h5>

        <GroupedSelectBox options={categories} />
        <h6 className="text-xs text-white">
          Assign a parent term to create a hierarchy. The term Jazz, for
          example, would be the parent of Bebop and Big Band.
        </h6>
      </div>
      <div>
        <h5 className="mt-8">Description</h5>
        <CustomTextArea className="h-[100px]" placeholder="Description" />
        <h6 className="text-xs">
          The description is not prominent by default; however, some themes may
          show it.
        </h6>
        <div className="my-4">
          <BorderedButtonPrimary
            title="Add Media"
            onClick={() => {
              set_open(true);
            }}
          />
        </div>

        <LibraryModal
          accept_file="Image"
          has_side_bar_action
          title="Add Media"
          open={open}
          set_open={set_open}
        />
        {/* <EditorComponent /> */}
        <DraftEditor />
        <div>
          <h5 className="mt-8">Chart Image</h5>
          <CustomTextArea />
        </div>
        <div className="mt-8">
          <h5>Is Visible</h5>
          <div className="my-2">
            <CustomRadioButton label="Yes" label_color="white" />
          </div>
          <CustomRadioButton label="No" label_color="white" />
        </div>
        <div className="mt-8">
          <h5>Is Visible Dropdown</h5>
          <div className="my-2">
            <CustomRadioButton label="Yes" label_color="white" />
          </div>
          <CustomRadioButton label="No" label_color="white" />
        </div>
        <div className="mt-8">
          <h5>Is This Top Category?</h5>
          <div className="my-2 flex">
            <CustomRadioButton label="No" label_color="white" />
            <span className="w-4"></span>
            <CustomRadioButton label="Yes" label_color="white" />
          </div>
        </div>
        <div className="mt-8">
          <h5>Category Image</h5>
          <div className="flex items-center">
            <h5 className="mr-6">No file Selected</h5>
            <BorderedButtonPrimary
              title="Add Image"
              onClick={() => {
                set_open(true);
              }}
            />
          </div>
        </div>
        <div className="mt-8">
          <h5>Courses Of Category</h5>
          <div className="my-2 flex">
            <CustomRadioButton label="No" label_color="white" />
            <span className="w-4"></span>
            <CustomRadioButton label="Yes" label_color="white" />
          </div>
        </div>
        <div className="mt-8 flex">
          <ContainedButtonPrimary title="Update" />
          <BorderedButtonPrimary
            title="Delete"
            red_error
            style={{ marginLeft: 42 }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCategoryComponent;
