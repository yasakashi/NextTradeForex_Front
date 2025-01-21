import { CgClose } from "react-icons/cg";
import ModalLayout from "../../../../common/modal_layout";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddNewInstructor = ({ isOpen, setIsOpen }) => {
  const isLoading = false;

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      bio: "",
    },

    onSubmit: async (values) => {
      console.log({ values });
    },
  });

  return (
    <ModalLayout onClose={setIsOpen} open={isOpen}>
      <form
        onSubmit={formik.handleSubmit}
        className="flex min-w-[50vw] flex-col max-h-[90vh]"
      >
        <div className="flex w-full flex-col border-b border-gray-300">
          <div className="flex justify-between items-center py-4 px-8 w-full">
            <h4 className="font-semibold">Add New Instructor</h4>
            <button onClick={() => setIsOpen(false)}>
              <CgClose />
            </button>
          </div>
        </div>

        <div className="px-8 py-8 bg-[#eff1f7] flex-grow h-full overflow-y-scroll scrollbar-thin space-y-8">
          <FormItem
            formik={formik}
            name="fname"
            label="First Name"
            placeholder="First Name"
          />

          <FormItem
            formik={formik}
            name="lname"
            label="Last Name"
            placeholder="Last Name"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormItem
              formik={formik}
              name="username"
              label="Username"
              placeholder="Username"
            />

            <FormItem
              formik={formik}
              name="phoneNumber"
              label="Phone Number (optional)"
              placeholder="Phone Number"
            />
          </div>

          <FormItem
            formik={formik}
            type="email"
            name="email"
            label="Email Address"
            placeholder="Email Address"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormItem
              formik={formik}
              name="password"
              label="Password"
              placeholder="******"
            />

            <FormItem
              formik={formik}
              name="retypePassword"
              label="Retype Password"
              placeholder="******"
            />
          </div>

          <div>
            <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
              Bio
            </span>
            <CKEditor
              editor={ClassicEditor}
              data={formik.values.bio}
              value={formik.values.bio}
              onChange={(event, editor) => {
                const data = editor.getData();
                formik.setFieldValue("bio", data);
              }}
            />
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-gray-300 flex items-center justify-between px-8 py-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-blue-accent px-4 py-[6px] hover:bg-blue-accent hover:text-white border border-blue-accent rounded-md"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-accent disabled:cursor-not-allowed px-4 py-[6px] text-white border border-blue-accent rounded-md shadow-sm"
          >
            {isLoading ? "Sending ..." : "Add Lesson"}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddNewInstructor;

const FormItem = ({
  formik,
  name,
  label,
  type = "text",
  description = "",
  placeholer = "",
  ...props
}) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
        {label}
      </span>

      <div className="col-span-1 md:col-span-3 w-full">
        <input
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.name}
          type={type}
          placeholder={placeholer}
          className="text-sm placeholder:text-gray-600 placeholder:text-sm border border-gray-400 px-2 py-[6px] rounded outline-[#2271b1] w-full"
          {...props}
        />

        {formik.touched[`${name}`] && formik.errors[`${name}`] ? (
          <span className="text-red-600 p-1 text-sm font-normal">
            {formik.errors[`${name}`]}
          </span>
        ) : null}

        {description ? (
          <p
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-sm p-1 text-[#646970]"
          ></p>
        ) : null}
      </div>
    </label>
  );
};
