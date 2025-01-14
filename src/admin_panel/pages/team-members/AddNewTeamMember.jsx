import { useFormik } from "formik";
import * as Yup from "yup";
import NewCourceCard from "../../../pages/profile/new_course_components/new_cource_card";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import AdminPanelTitle from "../../components/AdminPanelTitle";
import PublishComponent from "../../../pages/profile/new_course_components/publish_component";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import CustomRadioButton from "../categories/view/components/customRadioButton";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  designation: Yup.string().required("Designation is required"),
  continent: Yup.string().required("Continent is required"),
  gender: Yup.string().oneOf(["male", "female"], "Invalid gender"),
  bio: Yup.string().required("Bio is required"),
  about: Yup.string().required("About is required"),
  linkedIn: Yup.string().url("Invalid URL").nullable(),
  facebook: Yup.string().url("Invalid URL").nullable(),
  twitter: Yup.string().url("Invalid URL").nullable(),
  instagram: Yup.string().url("Invalid URL").nullable(),
});

const AddNewTeamMember = () => {
  const isLoading = false;

  const formik = useFormik({
    initialValues: {
      title: "",
      designation: "",
      continent: "",
      gender: "Male",
      bio: "",
      about: "",
      linkedIn: "",
      facebook: "",
      twitter: "",
      instagram: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex flex-col px-8 py-10">
      <AdminPanelTitle title="Add New Team Member" />
      <form
        onSubmit={formik.handleSubmit}
        className="space-x-0 lg:space-x-4 grid grid-cols-1 lg:grid-cols-4 items-start"
      >
        <div className="col-span-1 lg:col-span-3">
          <CustomTextInput
            name="title"
            placeholder="Add title"
            className="border border-gray-500 py-[10px] placeholder:text-sm rounded-md"
            value={formik.values?.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik?.touched?.title ? formik.errors?.title : ""}
          />
          <NewCourceCard title="Team Memeber">
            <div className="w-full p-4 flex flex-col relative space-y-8">
              {/* designation */}
              <FormItem
                formik={formik}
                name="designation"
                label="Designation"
                required={true}
              />

              <div className="w-full h-[1px] bg-gray-300" />

              {/* Continent */}
              <FormItem
                formik={formik}
                name="continent"
                label="Continent"
                required={true}
              />

              <div className="w-full h-[1px] bg-gray-300" />

              {/* gender */}
              <div className="w-full flex flex-col relative space-y-4">
                {/* long and short */}
                <div className="flex flex-col space-y-3 justify-between">
                  <span className="col-span-1 py-1 text-[13px] font-medium text-gray-700 text-nowrap">
                    Gender
                    <smal className="text-red-500 text-base">*</smal>
                  </span>
                  <div className="my-2 flex flex-col space-y-2">
                    <CustomRadioButton
                      onChange={(e) => {
                        formik.setFieldValue("gender", e.target.value);
                      }}
                      label="Male"
                      name="gender"
                      value="male"
                      checked={formik.values.gender === "Male"}
                    />{" "}
                    <CustomRadioButton
                      onChange={(e) => {
                        formik.setFieldValue("gender", e.target.value);
                      }}
                      label="Female"
                      name="gender"
                      value="female"
                      checked={formik.values.gender === "Female"}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-gray-300" />

              {/* bio */}
              <FormItem
                formik={formik}
                name="bio"
                label="Bio"
                required={true}
              />

              <div className="w-full h-[1px] bg-gray-300" />

              {/* about */}
              <label className="space-y-2">
                <h5 className="font-medium text-[14px] text-gray-700">
                  About
                  <span className="text-red-600">*</span>
                </h5>
                <CustomTextArea
                  name="about"
                  value={formik.values?.about}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-[130px] bg-white"
                  error={formik.touched.about ? formik.errors.about : null}
                />
              </label>

              <div className="w-full h-[1px] bg-gray-300" />

              {/* linkedIn */}
              <FormItem
                formik={formik}
                name="linkedIn"
                label="Linked in"
                placeholder="https://www.linkedin.com/in/username"
              />

              <div className="w-full h-[1px] bg-gray-300" />

              {/* facebook */}
              <FormItem
                formik={formik}
                name="facebook"
                label="Facebook"
                placeholder="https://www.facebook.com/username"
              />

              <div className="w-full h-[1px] bg-gray-300" />

              {/* twitter */}
              <FormItem
                formik={formik}
                name="twitter"
                label="Twitter"
                placeholder="https://www.twitter.com/username"
              />

              <div className="w-full h-[1px] bg-gray-300" />

              {/* instagram */}
              <FormItem
                formik={formik}
                name="instagram"
                label="Instagram"
                placeholder="https://www.instagram.com/username"
              />
            </div>
          </NewCourceCard>

          <div className="lg:hidden space-y-4">
            <PublishComponent isLoading={isLoading} />
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <PublishComponent isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default AddNewTeamMember;

const FormItem = ({
  formik,
  name,
  label,
  type = "text",
  required = false,
  ...props
}) => {
  return (
    <label className="flex flex-col gap-y-1">
      <span className="col-span-1 py-1 text-[13px] font-medium text-gray-700 text-nowrap">
        {label}
        {required ? <smal className="text-red-500 text-base">*</smal> : null}
      </span>
      <div className="col-span-1 md:col-span-3 w-full ">
        <input
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.name}
          type={type}
          className="text-sm border border-gray-400 px-2 py-[6px] rounded outline-[#2271b1] w-full"
          {...props}
        />
        {formik.touched[`${name}`] && formik.errors[`${name}`] ? (
          <span className="text-red-600 p-1 text-sm">
            {formik.errors[`${name}`]}
          </span>
        ) : null}
      </div>
    </label>
  );
};
