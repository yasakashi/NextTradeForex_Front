import { useFormik } from "formik";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import { useEffect, useRef, useState } from "react";
import LibraryModal from "../../../pages/profile/new_course_components/library_modal";
import { CustomButton } from "../../../components/ui/CustomButton";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import CustomRadioButton from "../categories/view/components/customRadioButton";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DraftEditor from "../../components/editor/draft_editor";
import { EditorState } from "draft-js";
import * as Yup from "yup";
import {
  getcities,
  getCountries,
  getStates,
} from "../../../redux/features/registerSlice";

const FILE_SIZE = 500 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const formikInitialValues = {
  language: "",
  username: "",
  fname: "",
  lname: "",
  nickname: "",
  displayPublicName: "",
  email: "",
  website: "",
  biographicalInfo: "",
  profilePic: null,
  newPassword: "",
  sessions: "",
  jobTitle: "",
  profileBio: "",
  profilePhoto: null,
  timezone: "",
  forexExprienceLevelId: 1,
  interestInForexId: 1,
  hobbyOfTrading: "fulltime",
  countryId: "",
  countryCode: "",
  mobile: "",
  stateId: "",
  cityId: "",
  refferedBy: "",
  activeTill: "",
  customerBillingAddress: {
    fname: "",
    lname: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    postCode: "",
    countryId: "",
    state: "",
    phone: "",
    email: "",
  },

  customerShippingAddress: {
    fname: "",
    lname: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    postCode: "",
    countryId: "",
    state: "",
    phone: "",
    email: "",
  },
};

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^[^\d]/, "Username must not start with numbers")
    .min(4, "Username must be more than 4 letters")
    .nullable(),
  fname: Yup.string()
    .matches(/^[^\d]/, "First name must not start with numbers")
    .min(4, "First name must be more than 4 letters")
    .nullable(),
  lname: Yup.string()
    .matches(/^[^\d]/, "Last name must not start with numbers")
    .min(4, "Last name must be more than 4 letters")
    .nullable(),
  nickname: Yup.string()
    .matches(/^[^\d]/, "Nickname must not start with numbers")
    .min(4, "Nickname must be more than 4 letters")
    .nullable(),
  jobTitle: Yup.string()
    .matches(/^[^\d]/, "Job title must not start with numbers")
    .min(4, "Job title must be more than 4 letters")
    .nullable(),
  website: Yup.string().url("Website must be a valid URL").nullable(),
  biographicalInfo: Yup.string()
    .max(512, "Biographical info must not be more than 512 characters")
    .nullable(),
  profileBio: Yup.string()
    .max(512, "Profile bio must not be more than 512 characters")
    .nullable(),
  profilePic: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "Profile picture must be less than 500 KB",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
  profilePhoto: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "Profile photo must be less than 500 KB",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
  countryCode: Yup.string()
    .matches(
      /^\+\d+$/,
      "Country code must start with '+' and contain numbers only"
    )
    .nullable(),
  mobile: Yup.string()
    .matches(/^\d+$/, "Mobile number must contain only numbers")
    .nullable(),
  customerBillingAddress: Yup.object().shape({
    fname: Yup.string()
      .matches(/^[^\d]/, "First name must not start with numbers")
      .min(4, "First name must be more than 4 letters")
      .nullable(),
    lname: Yup.string()
      .matches(/^[^\d]/, "Last name must not start with numbers")
      .min(4, "Last name must be more than 4 letters")
      .nullable(),

    postCode: Yup.string()
      .matches(/^\d+$/, "Post code must contain only numbers")
      .nullable(),

    phone: Yup.string()
      .matches(/^\d+$/, "Phone number must contain only numbers")
      .nullable(),
    email: Yup.string().email("Invalid email").nullable(),
  }),
  customerShippingAddress: Yup.object().shape({
    fname: Yup.string()
      .matches(/^[^\d]/, "First name must not start with numbers")
      .min(4, "First name must be more than 4 letters")
      .nullable(),
    lname: Yup.string()
      .matches(/^[^\d]/, "Last name must not start with numbers")
      .min(4, "Last name must be more than 4 letters")
      .nullable(),

    postCode: Yup.string()
      .matches(/^\d+$/, "Post code must contain only numbers")
      .nullable(),

    phone: Yup.string()
      .matches(/^\d+$/, "Phone number must contain only numbers")
      .nullable(),
    email: Yup.string().email("Invalid email").nullable(),
  }),
});

const AdminUsersProfile = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [openProfilePic, setOpenProfilePic] = useState(false);
  const [openProfilePhoto, setOpenProfilePhoto] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [style, setStyle] = useState("border-[#68de7c] bg-[#b8e6bf]");
  const [addPassword, setAddPassword] = useState(false);

  const dispatch = useDispatch();

  const { countries, states, cities } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: formikInitialValues,
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
    formik.setFieldValue("newPassword", randomPassword);
    const { value, style } = getPasswordStrength(randomPassword);
    setPasswordStrength(value);
    setStyle(style);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (formik.values?.countryId) {
      dispatch(getStates({ countryid: parseInt(formik.values?.countryId) }));
    }
  }, [formik.values.countryId]);

  useEffect(() => {
    if (formik.values?.countryId && formik.values?.stateId) {
      dispatch(getcities({ stateId: parseInt(formik.values?.stateId) }));
    }
  }, [formik.values?.stateId, formik.values.countryId]);

  const copyFromBillingAddressHandler = () => {
    console.log("clicked");
    const {
      fname,
      lname,
      company,
      address1,
      address2,
      city,
      postCode,
      countryId,
      state,
      phone,
      email,
    } = formik.values?.customerBillingAddress;

    formik.setValues({
      ...formik.values,
      customerShippingAddress: {
        fname,
        lname,
        company,
        address1,
        address2,
        city,
        postCode,
        countryId,
        state,
        phone,
        email,
      },
    });
  };

  const handleEditorChange = (editorData) => {
    formik.setFieldValue("profileBio", editorData.htmlContent); // Use HTML content

    // Update the editor state
    setEditorState(editorData.state);
  };

  return (
    <div className="py-10 px-8">
      <h2 className="font-normal text-2xl text-[#1d2327]">Add New User</h2>
      {console.log(formik.errors)}
      <form onSubmit={formik.handleSubmit} className="mt-10 space-y-10">
        {/* Name */}
        <div>
          <H3Title title="Name" />
          <div className="space-y-8 mt-4">
            <FormItem formik={formik} name="username" label="Username" />
            <FormItem formik={formik} name="fname" label="First Name" />
            <FormItem formik={formik} name="lname" label="Last Name" />
            <FormItem
              formik={formik}
              name="nickname"
              label="Nickname (required)"
            />

            <label className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 text-sm font-semibold text-gray-700 text-nowrap">
                Display name publickly as
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                <select
                  name="displayPublicName"
                  value={formik.values?.displayPublicName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white rounded w-[300px] border border-gray-400 text-sm text-gray-600 pl-2 py-[6px] cursor-pointer outline-[#2271b1] active:text-[#2271b1] focus:text-[#2271b1] focus:border-[#2271b1]"
                >
                  <option value="dataentry">Dataentry</option>
                  <option value="next">Next</option>
                  <option value="trade">trade</option>
                  <option value="next trade">Next trade</option>
                  <option value="trade next">Trade Next</option>
                </select>
              </div>
            </label>
          </div>
        </div>

        {/* contact info */}
        <div>
          <H3Title title="Contact Info" />
          <div className="space-y-8 mt-4">
            <FormItem
              formik={formik}
              name="email"
              label="Email"
              type="email"
              description="If you change this, an email will be sent at your new address to confirm it. <b>The new address will not become active until confirmed.</b>"
            />
            <FormItem formik={formik} name="website" label="Website" />
          </div>
        </div>

        {/* About yourself */}
        <div>
          <H3Title title="About Yourself" />

          <div className="space-y-8 mt-4">
            {/* biographcal info */}
            <label className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
                Biographical Info
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-full max-w-[700px]">
                <CustomTextArea
                  name="biographicalInfo"
                  value={formik.values?.biographicalInfo}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={
                    formik.touched?.biographicalInfo &&
                    formik.errors?.biographicalInfo
                      ? formik.errors?.biographicalInfo
                      : null
                  }
                  className="border-gray-400 min-h-[140px] w-full"
                />

                <p className="text-sm p-1 text-[#646970]">
                  Share a little biographical information to fill out your
                  profile. This may be shown publicly.
                </p>
              </div>
            </label>

            {/* profile pic */}
            <div className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
                Profile Picture
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-full max-w-[700px]">
                {formik.values?.profilePic ? (
                  <>
                    {formik.values?.profilePic instanceof File ? (
                      <img
                        className="w-[240px] aspect-video bg-contain border border-gray-300 mb-4"
                        src={URL.createObjectURL(formik.values?.profilePic)}
                      />
                    ) : (
                      <img
                        className="w-[240px] aspect-video bg-contain border border-gray-300 mb-4"
                        src={formik.values?.profilePic}
                      />
                    )}
                  </>
                ) : null}
                <CustomButton
                  type="button"
                  onClick={() => setOpenProfilePic(true)}
                  variant="outlined"
                  size="sm"
                >
                  {formik.values?.profilePic
                    ? "Change Profile"
                    : "Add Profile Picture"}
                </CustomButton>
              </div>

              <LibraryModal
                file={formik?.values?.profilePic}
                set_file={(file) => {
                  formik.setFieldValue("profilePic", file);
                }}
                error={formik.errors?.profilePic}
                onBlur={formik.handleBlur}
                accept_file="Image"
                has_side_bar_action={false}
                title="Add Media"
                open={openProfilePic}
                set_open={setOpenProfilePic}
                onSave={() => setOpenProfilePic(false)}
              />
            </div>
          </div>
        </div>

        {/* Account management */}
        <div>
          <H3Title title="Account Management" />
          <div className="space-y-8 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
                Password
              </span>
              <div className="flex flex-col space-y-3 gap-x-2 col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                <CustomButton
                  type="button"
                  onClick={() => {
                    setAddPassword(true);
                    handleGeneratePassword();
                  }}
                  variant="outlined"
                  size="sm"
                  className="w-[200px]"
                >
                  Add New Password
                </CustomButton>
                {addPassword ? (
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
                    <CustomButton
                      type="button"
                      onClick={() => {
                        formik.setFieldValue("newPassword", "");
                        setAddPassword(false);
                      }}
                      variant="outlined"
                      size="sm"
                    >
                      Cancel
                    </CustomButton>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
                Sessions
              </span>
              <div className="flex flex-col space-y-3 gap-x-2 col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                <CustomButton
                  type="button"
                  variant="outlined"
                  size="sm"
                  className="w-[200px]"
                  disabled={true}
                >
                  Log Out Everywhere Else
                </CustomButton>
                <p className="text-sm p-1 text-[#646970]">
                  You are only logged in at this location.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Password */}
        <div>
          <H3Title title="Application Password" />
          <div></div>
        </div>

        {/* Tutor Field */}
        <div>
          <H3Title title="Tutor Fields" />
          <div className="space-y-8 mt-4">
            <FormItem formik={formik} name="jobTitle" label="Job Title" />

            <label className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
                Profile Bio
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-full max-w-[700px]">
                <DraftEditor
                  editorState={editorState}
                  onChange={handleEditorChange}
                  h="250"
                  className="border border-gray-400"
                />

                <p className="text-sm p-1 text-[#646970]">
                  Write a little bit more about you, it will show publicly.
                </p>
              </div>
            </label>

            {/* profile photo */}
            <div className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
                Profile Photo
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-full max-w-[700px]">
                {formik.values?.profilePhoto ? (
                  <>
                    {formik.values?.profilePhoto instanceof File ? (
                      <img
                        className="w-[240px] aspect-video bg-contain border border-gray-300 mb-4"
                        src={URL.createObjectURL(formik.values?.profilePhoto)}
                      />
                    ) : (
                      <img
                        className="w-[240px] aspect-video bg-contain border border-gray-300 mb-4"
                        src={formik.values?.profilePhoto}
                      />
                    )}
                  </>
                ) : null}
                <CustomButton
                  type="button"
                  onClick={() => setOpenProfilePhoto(true)}
                  variant="outlined"
                  size="sm"
                >
                  {formik.values?.profilePhoto ? "Update" : "Add Profile Photo"}
                </CustomButton>
              </div>

              <LibraryModal
                file={formik?.values?.profilePhoto}
                set_file={(file) => {
                  formik.setFieldValue("profilePhoto", file);
                }}
                error={formik.errors?.profilePhoto}
                onBlur={formik.handleBlur}
                accept_file="Image"
                has_side_bar_action={false}
                title="Add Media"
                open={openProfilePhoto}
                set_open={setOpenProfilePhoto}
                onSave={() => setOpenProfilePhoto(false)}
              />
            </div>
          </div>
        </div>

        {/* users account details */}
        <div>
          <H3Title title="Users Account Details" />
          <div className="space-y-8 mt-4">
            {/* forex exprience level */}
            <label className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 text-sm font-semibold text-gray-700 text-nowrap">
                Forex Exprience Level
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                <select
                  name="forexExprienceLevelId"
                  value={formik.values?.forexExprienceLevelId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white rounded w-[300px] border border-gray-400 text-sm text-gray-600 pl-2 py-[6px] cursor-pointer outline-[#2271b1] active:text-[#2271b1] focus:text-[#2271b1] focus:border-[#2271b1]"
                >
                  <option value="1">Newbie</option>
                  <option value="2">Intermediate</option>
                  <option value="3">Advanced</option>
                </select>
              </div>
            </label>

            {/* interest in forex */}
            <label className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 text-sm font-semibold text-gray-700 text-nowrap">
                Interest in Forex
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                <select
                  name="interestInForexId"
                  value={formik.values?.interestInForexId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white rounded w-[300px] border border-gray-400 text-sm text-gray-600 pl-2 py-[6px] cursor-pointer outline-[#2271b1] active:text-[#2271b1] focus:text-[#2271b1] focus:border-[#2271b1]"
                >
                  <option value="1">Forex</option>
                  <option value="2">Commodities</option>
                  <option value="3">Indices</option>
                  <option value="4">Stocks</option>
                  <option value="5">Binary Trading</option>
                  <option value="6">Crypto</option>
                </select>
              </div>
            </label>

            {/* Hobby of trading */}
            <div className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 text-sm font-semibold text-gray-700 text-nowrap">
                Hobby of Trading
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                <div className="flex items-center gap-x-5">
                  <CustomRadioButton
                    checked={formik.values?.hobbyOfTrading === "fulltime"}
                    label="Full time"
                    name="hobbyOfTrading"
                    onChange={(e) =>
                      (e.target.value === "Yes") &
                      formik.setFieldValue("hobbyOfTrading", "fulltime")
                    }
                  />

                  <CustomRadioButton
                    checked={formik.values?.hobbyOfTrading === "parttime"}
                    label="Part time"
                    name="hobbyOfTrading"
                    onChange={(e) =>
                      (e.target.value === "Yes") &
                      formik.setFieldValue("hobbyOfTrading", "parttime")
                    }
                  />
                </div>
              </div>
            </div>

            <FormItem formik={formik} name="mobile" label="Mobile" />

            {/* country */}
            <div className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 text-sm font-semibold text-gray-700 text-nowrap">
                Country
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                <select
                  name="countryId"
                  value={formik.values?.countryId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white rounded w-full border border-gray-400 text-sm text-gray-600 pl-2 py-[6px] cursor-pointer outline-[#2271b1] active:text-[#2271b1] focus:text-[#2271b1] focus:border-[#2271b1]"
                >
                  <option value="">select country</option>
                  {countries?.length
                    ? countries.map((country, index) => (
                        <option key={index} value={country?.countryid}>
                          {country?.countryname}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </div>

            {/* state */}
            <div className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 text-sm font-semibold text-gray-700 text-nowrap">
                State
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                <select
                  name="stateId"
                  value={formik.values?.stateId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white rounded w-full border border-gray-400 text-sm text-gray-600 pl-2 py-[6px] cursor-pointer outline-[#2271b1] active:text-[#2271b1] focus:text-[#2271b1] focus:border-[#2271b1]"
                >
                  <option value="">select state</option>
                  {states?.length
                    ? states.map((state, index) => (
                        <option key={index} value={state?.stateid}>
                          {state?.statename}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </div>

            {/* City */}
            <div className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 text-sm font-semibold text-gray-700 text-nowrap">
                City
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                <select
                  name="cityId"
                  value={formik.values?.cityId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white rounded w-full border border-gray-400 text-sm text-gray-600 pl-2 py-[6px] cursor-pointer outline-[#2271b1] active:text-[#2271b1] focus:text-[#2271b1] focus:border-[#2271b1]"
                >
                  <option>select city</option>
                  {cities?.length
                    ? cities.map((city, index) => (
                        <option key={index} value={city?.cityid}>
                          {city?.cityname}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </div>

            <FormItem
              formik={formik}
              name="referredBy"
              readOnly
              label="Referred By"
              placeholer="Referred By *"
              disabled={true}
            />
          </div>
        </div>

        {/* User Active Till */}
        <div>
          <div className="space-y-8 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-4">
              <H3Title title="User Active Till" />
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                <DatePicker
                  format="MM/DD/YYYY HH:mm:ss"
                  plugins={[<TimePicker hideSeconds position="bottom" />]}
                  calendarPosition="top-right"
                  inputClass="w-full block py-[6px] text-gray-600 px-3 border border-gray-300"
                  containerClassName="w-full"
                  value={formik?.values?.activeTill}
                  onChange={(date) =>
                    formik.setFieldValue("activeTill", date.format())
                  }
                  placeholder="mm/dd/yyyy, --:-- --"
                />
              </div>
            </div>
          </div>
        </div>

        {/* custome biling address */}
        <div>
          <H3Title title="Customer billing address" />
          <div className="space-y-8 mt-4">
            <FormItem
              formik={formik}
              name="customerBillingAddress.fname"
              label="First Name"
            />

            <FormItem
              formik={formik}
              name="customerBillingAddress.lname"
              label="Last Name"
            />

            <FormItem
              formik={formik}
              name="customerBillingAddress.company"
              label="Company"
            />

            <FormItem
              formik={formik}
              name="customerBillingAddress.address1"
              label="Address line 1"
            />

            <FormItem
              formik={formik}
              name="customerBillingAddress.address2"
              label="Address line 2"
            />

            <FormItem
              formik={formik}
              name="customerBillingAddress.city"
              label="City"
            />

            <FormItem
              formik={formik}
              name="customerBillingAddress.postCode"
              label="Postcode / ZIP"
            />

            <FormItem
              formik={formik}
              name="customerBillingAddress.countryId"
              label="Country / Region"
            />

            <FormItem
              formik={formik}
              name="customerBillingAddress.state"
              label="State / County"
            />

            <FormItem
              formik={formik}
              name="customerBillingAddress.phone"
              label="Phone"
            />

            <FormItem
              formik={formik}
              name="customerBillingAddress.email"
              label="Email Address"
            />
          </div>
        </div>

        {/* custome shipping address */}
        <div>
          <H3Title title="Customer shipping address" />
          <div className="space-y-8 mt-4">
            <label className="grid grid-cols-1 md:grid-cols-4">
              <span className="col-span-1 py-1 text-sm font-semibold text-gray-700 text-nowrap">
                Copy from billing address
              </span>
              <div className="col-span-1 md:col-span-3 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-[500px]">
                <CustomButton
                  onClick={copyFromBillingAddressHandler}
                  variant="outlined"
                  size="sm"
                >
                  Copy
                </CustomButton>
              </div>
            </label>

            <FormItem
              formik={formik}
              name="customerShippingAddress.fname"
              label="First Name"
            />

            <FormItem
              formik={formik}
              name="customerShippingAddress.lname"
              label="Last Name"
            />
            {console.log(formik.values)}

            <FormItem
              formik={formik}
              name="customerShippingAddress.company"
              label="Company"
            />

            <FormItem
              formik={formik}
              name="customerShippingAddress.address1"
              label="Address line 1"
            />

            <FormItem
              formik={formik}
              name="customerShippingAddress.address2"
              label="Address line 2"
            />

            <FormItem
              formik={formik}
              name="customerShippingAddress.city"
              label="City"
            />

            <FormItem
              formik={formik}
              name="customerShippingAddress.postCode"
              label="Postcode / ZIP"
            />

            <FormItem
              formik={formik}
              name="customerShippingAddress.countryId"
              label="Country / Region"
            />

            <FormItem
              formik={formik}
              name="customerShippingAddress.state"
              label="State / County"
            />

            <FormItem
              formik={formik}
              name="customerShippingAddress.phone"
              label="Phone"
            />

            <FormItem
              formik={formik}
              name="customerShippingAddress.email"
              label="Email Address"
            />
          </div>
        </div>

        {/* submit */}

        <CustomButton size="sm">Update Profile</CustomButton>
      </form>
    </div>
  );
};

export default AdminUsersProfile;

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

const H3Title = ({ title }) => {
  return <h3 className="text-lg font-bold text-gray-700">{title}</h3>;
};

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
