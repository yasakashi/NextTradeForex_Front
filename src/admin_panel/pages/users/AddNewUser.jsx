import { useFormik } from "formik";
import { CustomButton } from "../../../components/ui/CustomButton";
import { SiGoogletranslate } from "react-icons/si";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  fname: Yup.string()
    .matches(/^[A-Za-z]+$/, "First name must not contain numbers")
    .required("First name is required"),
  lname: Yup.string()
    .matches(/^[A-Za-z]+$/, "Last name must not contain numbers")
    .required("Last name is required"),
  website: Yup.string().url("Invalid URL"),
  language: Yup.string().required("Language is required"),
  password: Yup.string().min(4, "Password must be at least 8 characters"),
});

const getPasswordStrength = (password) => {
  let strength = 0;
  let value = "";
  let style = "";
  if (password.length >= 4) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[!@#$%^&*()_=+]/.test(password)) strength += 1;
  if (strength === 1) {
    value = "Very Weak";
    style = "border-[#ffabaf] bg-[#e65054]";
  } else if (strength === 2) {
    value = "Weak";
    style = "border-[#f86368] bg-[#facfd2]";
  } else if (strength === 3) {
    value = "Medium";
    style = "border-[#f0c33c] bg-[#f5e6ab]";
  } else if (strength >= 4) {
    value = "Strong";
    style = "border-[#68de7c] bg-[#b8e6bf]";
  }
  return { value, style };
};

  const generateRandomPassword = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_+=";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

const AddNewUser = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [style, setStyle] = useState("border-[#68de7c] bg-[#b8e6bf]");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      fname: "",
      lname: "",
      website: "",
      language: "en",
      password: "",
      sendNotification: true,
      role: 1,
      forumRole: 1,
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handlePasswordChange = (e) => {
    formik.handleChange(e);
    const { value, style } = getPasswordStrength(e.target.value);
    setPasswordStrength(value);
    setStyle(style);
  };



  const handleGeneratePassword = () => {
    const randomPassword = generateRandomPassword();
    formik.setFieldValue("password", randomPassword);
    const { value ,style } = getPasswordStrength(randomPassword);
    setPasswordStrength(value);
     setStyle(style);
  };

  return (
    <div className="py-10 px-8">
      <h2 className="font-normal text-2xl text-[#1d2327]">Add New User</h2>
      {console.log(formik.values, style)}
      <p className="mt-10 text-[13px] text-gray-600 font-normal">
        Create a brand new user and add the to this site.
      </p>

      <form onSubmit={formik.handleSubmit} className="mt-10 mb-10 space-y-8">
        {/* username */}
        <FormItem formik={formik} name="username" label="Username (required)" />

        {/* email */}
        <FormItem
          formik={formik}
          name="email"
          label="Email (required)"
          type="email"
        />

        {/* First name */}
        <FormItem formik={formik} name="fname" label="First Name" />

        {/* Last Name */}
        <FormItem formik={formik} name="lname" label="Last Name" />

        {/* Website */}
        <FormItem formik={formik} name="website" label="Website" />

        {/* Language */}
        <Language formik={formik} />

        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
            Password
          </span>
          <div className="flex flex-col space-y-3 gap-x-2 col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
            <CustomButton
              type="button"
              onClick={handleGeneratePassword}
              variant="outlined"
              size="sm"
              className="w-[200px]"
            >
              Generage Password
            </CustomButton>

            <div className="flex items-start gap-x-2">
              <div className="w-[300px]">
                <input
                  name="password"
                  onChange={handlePasswordChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.password}
                  type={showPassword ? "text" : "password"}
                  className="text-sm border border-gray-400 px-2 py-[6px] rounded-t outline-[#2271b1] w-full"
                />
                {passwordStrength ? (
                  <div
                    className={`text-center py-[6px] border rounded-b text-sm ${style}`}
                  >
                    {passwordStrength}
                  </div>
                ) : null}
              </div>
              <CustomButton
                onClick={() => setShowPassword(!showPassword)}
                variant="outlined"
                size="sm"
              >
                {showPassword ? (
                  <span className="flex items-center gap-1 text-nowrap">
                    <IoIosEyeOff size={17} />
                    Hide
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-nowrap">
                    <IoIosEye size={17} />
                    Show
                  </span>
                )}
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Send User Notification */}
        <label className="grid grid-cols-1 md:grid-cols-4">
          <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
            Send User Notification
          </span>
          <div className="flex items-start gap-x-2 col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
            <input
              name="sendNotification"
              value={formik.values.sendNotification}
              type="checkbox"
              className="scale-125"
              checked={formik.values?.sendNotification}
              onChange={formik.handleChange}
            />
            <p className="text-sm text-gray-600">
              Send the new user an email about their account.
            </p>
          </div>
        </label>

        {/* Role */}
        <label className="grid grid-cols-1 md:grid-cols-4">
          <span className="col-span-1 text-sm font-semibold text-gray-700 text-nowrap">
            Role
          </span>
          <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
            <select
              name="role"
              value={formik.values?.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-white rounded w-[300px] border border-gray-400 text-sm text-gray-600 pl-2 py-[6px] cursor-pointer outline-[#2271b1] active:text-[#2271b1] focus:text-[#2271b1] focus:border-[#2271b1]"
            >
              <option value="1">Executive</option>
              <option value="2">Director</option>
              <option value="3">Adminstrator</option>
              <option value="4">Instructor</option>
              <option value="5">Student</option>
            </select>
            {formik.touched?.role && formik.errors.role ? (
              <span className="text-red-600 p-1 text-sm">
                {formik.errors.role}
              </span>
            ) : null}
          </div>
        </label>

        {/* Forum role */}

        <label className="grid grid-cols-1 md:grid-cols-4">
          <span className="col-span-1 text-sm font-semibold text-gray-700 text-nowrap">
            Forum Role
          </span>
          <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
            <select
              name="forumRole"
              value={formik.values?.forumRole}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-white rounded w-[300px] border border-gray-400 text-sm text-gray-600 pl-2 py-[6px] cursor-pointer outline-[#2271b1] active:text-[#2271b1] focus:text-[#2271b1] focus:border-[#2271b1]"
            >
              <option value="1">Keymaster</option>
              <option value="2">Moderator</option>
              <option value="3">Participant</option>
              <option value="4">Spectator</option>
              <option value="5">Blocked</option>
            </select>
            {formik.touched?.forumRole && formik.errors.forumRole ? (
              <span className="text-red-600 p-1 text-sm">
                {formik.errors.forumRole}
              </span>
            ) : null}
          </div>
        </label>

        <CustomButton size="sm">Add New User</CustomButton>
      </form>
    </div>
  );
};

export default AddNewUser;

const FormItem = ({ formik, name, label, type = "text", ...props }) => {
  return (
    <label className="grid grid-cols-1 md:grid-cols-4">
      <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
        {label}
      </span>
      <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
        <input
          name={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.name}
          type={type}
          className="text-sm border border-gray-400 px-2 py-[6px] rounded outline-[#2271b1] w-full"
          {...props}
        />
        {formik.touched?.name && formik.errors.name ? (
          <span className="text-red-600 p-1 text-sm">{formik.errors.name}</span>
        ) : null}
      </div>
    </label>
  );
};

const Language = ({ formik }) => {
  return (
    <label className="grid grid-cols-1 md:grid-cols-4">
      <span className="flex items-center gap-1 py-1 col-span-1 text-sm font-semibold text-gray-700 text-nowrap">
        Language
        <SiGoogletranslate size={15} />
      </span>
      <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
        <select
          name="language"
          value={formik.values?.language}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-white rounded w-[300px] border border-gray-400 text-sm text-gray-600 pl-2 py-[6px] cursor-pointer outline-[#2271b1] active:text-[#2271b1] focus:text-[#2271b1] focus:border-[#2271b1]"
        >
          <option value="site-default" data-installed="1" selected="selected">
            Site Default
          </option>
          <option value="" lang="en" data-installed="1">
            English (United States)
          </option>
          <option value="af" lang="af" data-installed="1">
            Afrikaans
          </option>
          <option value="azb" lang="az" data-installed="1">
            گؤنئی آذربایجان
          </option>
          <option value="bn_BD" lang="bn" data-installed="1">
            বাংলা
          </option>
          <option value="ceb" lang="ceb" data-installed="1">
            Cebuano
          </option>
          <option value="fr_FR" lang="fr" data-installed="1">
            Français
          </option>
          <option value="fy" lang="fy" data-installed="1">
            Frysk
          </option>
          <option value="hi_IN" lang="hi" data-installed="1">
            हिन्दी
          </option>
          <option value="id_ID" lang="id" data-installed="1">
            Bahasa Indonesia
          </option>
          <option value="it_IT" lang="it" data-installed="1">
            Italiano
          </option>
          <option value="ja" lang="ja" data-installed="1">
            日本語
          </option>
          <option value="ko_KR" lang="ko" data-installed="1">
            한국어
          </option>
          <option value="ms_MY" lang="ms" data-installed="1">
            Bahasa Melayu
          </option>
          <option value="ne_NP" lang="ne" data-installed="1">
            नेपाली
          </option>
          <option value="pt_BR" lang="pt" data-installed="1">
            Português do Brasil
          </option>
          <option value="ru_RU" lang="ru" data-installed="1">
            Русский
          </option>
          <option value="th" lang="th" data-installed="1">
            ไทย
          </option>
          <option value="tr_TR" lang="tr" data-installed="1">
            Türkçe
          </option>
          <option value="uz_UZ" lang="uz" data-installed="1">
            O‘zbekcha
          </option>
          <option value="vi" lang="vi" data-installed="1">
            Tiếng Việt
          </option>
          <option value="zh_CN" lang="zh" data-installed="1">
            简体中文
          </option>
        </select>
        {formik.touched?.language && formik.errors.language ? (
          <span className="text-red-600 p-1 text-sm">
            {formik.errors.language}
          </span>
        ) : null}
      </div>
    </label>
  );
};
