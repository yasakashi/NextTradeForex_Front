import { useState } from "react";
import LibraryModal from "../../../pages/profile/new_course_components/library_modal";
import AdminPanelTitle from "../../components/AdminPanelTitle";
import { CustomButton } from "../../../components/ui/CustomButton";
import { IoMdClose } from "react-icons/io";

const AddNewMediaFile = () => {
  const [is_open, set_is_open] = useState(false);
  const [file, setFile] = useState(null);

  return (
    <div className="pt-10 px-8">
      {console.log({ file })}
      <AdminPanelTitle title="Upload New Media" />

      <div className="bg-slate-200 w-full flex flex-col items-center justify-center md:w-[80%] h-[200px] mx-auto border border-dashed border-slate-400 rounded-l-lg">
        {file ? (
          <div className="max-w-[500px] aspect-video h-[90%] relative">
            <img
              className="w-full h-full"
              src={file instanceof File ? URL.createObjectURL(file) : ""}
              alt=""
            />

            <span
              onClick={() => setFile(null)}
              className="absolute top-1 right-1 cursor-pointer bg-red-300 rounded-full p-1"
            >
              <IoMdClose size={16} className="text-gray-500" />
            </span>
          </div>
        ) : (
          <div className="flex items-center flex-col space-y-4">
            <p className="text-gray-600 text-base">Select your file</p>
            <CustomButton
              type="button"
              onClick={() => set_is_open(true)}
              size="sm"
            >
              Select
            </CustomButton>

            <p className="text-gray-500 text-sm">
              Maximum upload file size: 2 GB.
            </p>
          </div>
        )}
      </div>

      <LibraryModal
        has_side_bar_action={false}
        open={is_open}
        set_open={set_is_open}
        title="Featured image"
        file={file}
        set_file={(file) => {
          setFile(file);
        }}
        onSave={(val) => {
          set_is_open(false);
        }}
      />
    </div>
  );
};

export default AddNewMediaFile;
