import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

const ResetPassword = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
 
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const updateUserValidation = Yup.object({
    oldpassword: Yup.string().required("Current password is required"),
    newpassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters")
      .max(24, "Password cannot be more than 24 characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    retypeNewPassword: Yup.string()
      .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
      .required("Re-type new password is required"),
  });

  const formik = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
    },
    validationSchema: updateUserValidation,
    onSubmit: async (values) => {
      const { currentPassword, newPassword } = values;
      console.log({ values });
    },
  });
  return (
    <div className="my-10">
      <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-6">
        <div className="flex justify-center flex-col gap-6 mt-4">
          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">
              Current Password
            </span>
            <input
              name="oldpassword"
              type="password"
              value={formik.values.oldpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="Current Password"
            />
            {formik.touched.oldpassword && formik.errors.oldpassword && (
              <span className="text-red-600 text-xs p-1">
                {formik.errors.oldpassword}
              </span>
            )}
          </label>

          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">
              New Password
            </span>
            <div className="relative w-full">
              <input
                name="newpassword"
                type={showPass ? "text" : "password"}
                value={formik.values.newpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-3 py-3 w-full outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
                placeholder="New Password"
              />
              {showPass ? (
                <EyeSlashIcon
                  onClick={() => setShowPass(!showPass)}
                  className="w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={() => setShowPass(!showPass)}
                  className="w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              )}
            </div>
            {formik.touched.newpassword && formik.errors.newpassword && (
              <span className="text-red-600 text-xs p-1">
                {formik.errors.newpassword}
              </span>
            )}
          </label>

          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">
              Re-type New Password
            </span>

            <div className="relative w-full">
              <input
                name="retypeNewPassword"
                type={showConfirmPass ? "text" : "password"}
                value={formik.values.retypeNewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-3 py-3 w-full outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
                placeholder="New Password"
              />
              {showConfirmPass ? (
                <EyeSlashIcon
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                />
              )}
            </div>
            {formik.touched.retypeNewPassword &&
              formik.errors.retypeNewPassword && (
                <span className="text-red-600 text-xs p-1">
                  {formik.errors.retypeNewPassword}
                </span>
              )}
          </label>
        </div>

        <div>
          <button className="text-blue-light font-semibold text-base bg-gold-light_400 px-4 py-2 rounded-md mt-4">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
