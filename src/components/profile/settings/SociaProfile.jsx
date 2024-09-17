import { useFormik } from "formik";
import * as Yup from "yup";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FaGithub, FaEarthAsia } from "react-icons/fa6";

const SocialProfile = () => {
  const validationSchema = Yup.object({
    facebook: Yup.string()
      .nullable()
      .matches(
        /^https:\/\/facebook\.com\/[a-zA-Z0-9._-]+$/,
        "Invalid Facebook URL"
      ),
    twitter: Yup.string()
      .nullable()
      .matches(
        /^https:\/\/twitter\.com\/[a-zA-Z0-9._-]+$/,
        "Invalid Twitter URL"
      ),
    linkedin: Yup.string()
      .nullable()
      .matches(
        /^https:\/\/linkedin\.com\/in\/[a-zA-Z0-9._-]+$/,
        "Invalid LinkedIn URL"
      ),
    website: Yup.string().nullable().url("Invalid Website URL"),
    github: Yup.string()
      .nullable()
      .matches(
        /^https:\/\/github\.com\/[a-zA-Z0-9._-]+$/,
        "Invalid GitHub URL"
      ),
  });

  const formik = useFormik({
    initialValues: {
      facebook: "",
      twitter: "",
      linkedin: "",
      website: "",
      github: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // dispatch or handle form submission...
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <label className="flex items-center space-x-4">
            <FaFacebookF className="text-white" size={16} />

            <span className="text-white text-base font-medium">Facebook</span>
            <input
              name="facebook"
              type="text"
              value={formik.values.facebook}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-[10px] w-[70%] outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm flex justify-end"
              placeholder="https://facebook.com/username"
            />
            {formik.touched.facebook && formik.errors.facebook && (
              <span className="text-red-600 text-xs p-1">
                {formik.errors.facebook}
              </span>
            )}
          </label>

          <label className="flex items-center space-x-4">
            <FaTwitter className="text-white" size={16} />
            <span className="text-white text-base font-medium">Twitter</span>
            <input
              name="twitter"
              type="text"
              value={formik.values.twitter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-[10px] w-[70%] outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm flex justify-end"
              placeholder="https://twitter.com/username"
            />
            {formik.touched.twitter && formik.errors.twitter && (
              <span className="text-red-600 text-xs p-1">
                {formik.errors.twitter}
              </span>
            )}
          </label>

          <label className="flex items-center space-x-4">
            <FaLinkedinIn className="text-white" size={16} />
            <span className="text-white text-base font-medium">LinkedIn</span>
            <input
              name="linkedin"
              type="text"
              value={formik.values.linkedin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-[10px] w-[70%] outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm flex justify-end"
              placeholder="https://linkedin.com/in/username"
            />
            {formik.touched.linkedin && formik.errors.linkedin && (
              <span className="text-red-600 text-xs p-1">
                {formik.errors.linkedin}
              </span>
            )}
          </label>

          <label className="flex items-center space-x-4">
            <FaEarthAsia className="text-white" size={16} />
            <span className="text-white text-base font-medium">Website</span>
            <input
              name="website"
              type="text"
              value={formik.values.website}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-[10px] w-[70%] outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm flex justify-end"
              placeholder="https://example.com"
            />
            {formik.touched.website && formik.errors.website && (
              <span className="text-red-600 text-xs p-1">
                {formik.errors.website}
              </span>
            )}
          </label>

          <label className="flex items-center space-x-4">
            <FaGithub className="text-white" size={16} />
            <span className="text-white text-base font-medium">GitHub</span>
            <input
              name="github"
              type="text"
              value={formik.values.github}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-[10px] w-[70%] outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm flex justify-end"
              placeholder="https://github.com/username"
            />
            {formik.touched.github && formik.errors.github && (
              <span className="text-red-600 text-xs p-1">
                {formik.errors.github}
              </span>
            )}
          </label>

          <div>
            <button
              type="submit"
              className="text-blue-light font-semibold text-base bg-gold-light_400 px-4 py-2 rounded-md mt-4"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SocialProfile;
