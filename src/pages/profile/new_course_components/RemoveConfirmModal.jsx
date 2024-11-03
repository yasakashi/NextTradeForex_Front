import { TiWarningOutline } from "react-icons/ti";
import { FiTrash2 } from "react-icons/fi";

import ModalLayout from "../../../common/modal_layout";
import { CustomButton } from "../../../components/ui/CustomButton";

const RemoveConfirmModal = ({
  removeHandler = () => {},
  open,
  setOpen = () => {},
  isLoading = false,
  itemType,
}) => {
  return (
    <ModalLayout className="mx-4 sm:mx-0" open={open}>
      <div className="w-[90%] mx-auto sm:w-[420px] h-auto p-4 flex flex-col justify-center items-center">
        <h4 className="text-gray-700 font-semibold text-base pb-4">
          {itemType === "topic"
            ? "Confirm topic removal"
            : itemType === "lesson"
            ? "Confirm topic lesson removal"
            : ""}
        </h4>
        <p className="text-center text-gray-600">
          {itemType === "topic"
            ? "Are you sure you want to delete this topic from the course ?"
            : itemType === "lesson"
            ? "Are you sure you want to delete this lesson from the topic ?"
            : ""}
        </p>

        <div className="bg-slate-200 shadow-md p-2 rounded-lg my-3 mx-1">
          <div className="flex items-center text-sm gap-1">
            <TiWarningOutline className="text-orange-500" size={24} />
            <span className="text-orange-600">Warning</span>
          </div>
          <p className="text-xs font-medium text-gray-600 px-1 py-2">
            {itemType === "topic"
              ? "By deleting this topic, all the lessons and topic will also be permanently deleted."
              : itemType === "lesson"
              ? "By deleting this lesson, lesson will be permanently deleted."
              : ""}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <CustomButton
            onClick={() => setOpen(false)}
            variant="outlined"
            size="sm"
          >
            No, cancel
          </CustomButton>
          <CustomButton
            disabled={isLoading}
            className="flex items-center gap-1"
            onClick={removeHandler}
            variant="remove"
            size="sm"
          >
            {isLoading ? (
              "removing ..."
            ) : (
              <>
                <FiTrash2 size={16} />
                Yes, confirm delete
              </>
            )}
          </CustomButton>
        </div>
      </div>
    </ModalLayout>
  );
};

export default RemoveConfirmModal;
