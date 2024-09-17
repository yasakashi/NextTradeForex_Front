import { Link, useNavigate, useParams } from "react-router-dom";
import MainBannerTitle from "../../common/MainBannerTitle";
import HeroTemp from "../../components/HeroTemp";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputError from "../../components/InputError";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerAction,
  googleRegisterAction,
} from "../../redux/features/registerSlice";
import CustomCircleLoader from "../../utils/loaders/CustomCircleLoader";
import CustomBtnLg from "../../common/CustomBtnLg";
import { GoogleLogin } from "react-google-login";
import GoogleLoginComponent from "./GoogleRegister";

const Register = () => {
  const params = useParams();
  const subRoute = params["*"];

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const { userData, isLoading, messageCode } = useSelector(
    (state) => state.auth
  );

  // formik
  const registerValidation = Yup.object({
    fname: Yup.string("Name must be string.")
      .required("Name is required.")
      .min(4, "Must be at least 4 characters."),
    lname: Yup.string("Last Name must be string.")
      .required("Last Name is required.")
      .min(4, "Must be at least 4 characters."),
    username: Yup.string()
      .required("User name is required.")
      .min(4, "Must be at least 4 characters."),
    mobile: Yup.string()
      .required("Mobile number is required.")
      .matches(
        /^(\+\d{1,3}[- ]?)?\d{1,14}$/,
        "Please enter a valid phone number."
      ),
    email: Yup.string()
      .required("Email is required.")
      .email("Invalid email adddress!"),
    password: Yup.string()
      .required(
        "Enter a combination of alt least eight numbers, letters and punctuation marks (such as ! and &,@)"
      )
      .min(8, "Password is too short")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "password must contain uppercase, lowercase, number and  special character"
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    userTypeId: Yup.string().required("Choose your role."),
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      username: "",
      mobile: "",
      email: "",
      password: "",
      confirm_password: "",
      address: null,
      nationalcode: null,
      birthDate: null,
      sex: null,
      personTypeId: 0,
      userPic: null,
      fathername: null,
      marriedstatusid: null,
      companyname: null,
      taxcode: null,
      familycount: null,
      legaladdress: null,
      telephone: null,
      postalcode: null,
      legalnationalcode: null,
      userTypeId: "4",
    },
    validationSchema: registerValidation,
    onSubmit: (values) => {
      console.log(values);
      dispatch(registerAction({ values }));
    },
  });

  return (
    <>
      {isLoading && (
        <div className="w-full h-screen fixed inset-0 z-[1001] flex justify-center items-center">
          <div className="w-full h-full absolute bg-black opacity-65"></div>
          <div className="z-[1002]">
            <CustomCircleLoader />
          </div>
        </div>
      )}

      <div className="text-white bg-blue-dark">
        <div>
          <HeroTemp needNav={false}>
            <MainBannerTitle title="Register" subRoute={subRoute} />
          </HeroTemp>
        </div>

        <div className="mt-16 pb-20 wrapper flex justify-center ">
          <div className="bg-blue-light w-full sm:w-[510px] z-[50] rounded-2xl p-5 shadow-2xl">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col space-y-4">
                {/* first name, last name */}
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <label className="space-y-2">
                    <span className="text-gray-400 text-sm">First Name *</span>
                    <input
                      name="fname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fname}
                      type="text"
                      className="formInputText"
                      placeholder="First Name"
                    />
                    {formik.touched.fname && formik.errors.fname ? (
                      <InputError title={formik.errors.fname} />
                    ) : null}
                  </label>

                  <label className="space-y-2">
                    <span className="text-gray-400 text-sm">Last Name *</span>
                    <input
                      name="lname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lname}
                      type="text"
                      className="formInputText"
                      placeholder="Last Name"
                    />

                    {formik.touched.lname && formik.errors.lname ? (
                      <InputError title={formik.errors.lname} />
                    ) : null}
                  </label>
                </div>

                <label className="space-y-2">
                  <span className="text-gray-400 text-sm">Username *</span>
                  <input
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    type="text"
                    className="formInputText"
                    placeholder="Username"
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <InputError title={formik.errors.username} />
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-gray-400 text-sm">Mobile *</span>
                  <input
                    name="mobile"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                    type="text"
                    className="formInputText"
                    placeholder="Mobile"
                  />

                  {formik.touched.mobile && formik.errors.mobile ? (
                    <InputError title={formik.errors.mobile} />
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-gray-400 text-sm">Email *</span>
                  <input
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    type="email"
                    className="formInputText"
                    placeholder="Email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <InputError title={formik.errors.email} />
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-gray-400 text-sm">Address</span>
                  <input
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    type="text"
                    className="formInputText"
                    placeholder="Address"
                  />

                  {formik.touched.address && formik.errors.address ? (
                    <InputError title={formik.errors.address} />
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-gray-400 text-sm">Birth Date</span>
                  <input
                    name="birthDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birthDate}
                    type="text"
                    className="formInputText"
                    placeholder="Birth Date"
                  />

                  {formik.touched.birthDate && formik.errors.birthDate ? (
                    <InputError title={formik.errors.birthDate} />
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-gray-400 text-sm">Password *</span>
                  <div className="w-full relative">
                    <input
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      type={showPass ? "text" : "password"}
                      className="formInputText"
                      placeholder="Password"
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

                  {formik.touched.password && formik.errors.password ? (
                    <InputError title={formik.errors.password} />
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-gray-400 text-sm">
                    Confirm Password *
                  </span>
                  <div className="w-full h-full relative">
                    <input
                      name="confirm_password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirm_password}
                      type={showConfirmPass ? "text" : "password"}
                      className="formInputText"
                      placeholder="Confirm Password"
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

                  {formik.touched.confirm_password &&
                  formik.errors.confirm_password ? (
                    <InputError title={formik.errors.confirm_password} />
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-gray-400 text-sm">Referral Code</span>
                  <input
                    name="referral_code"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.referral_code}
                    type="text"
                    className="formInputText"
                    placeholder="Referral Code"
                  />

                  {formik.touched.referral_code &&
                  formik.errors.referral_code ? (
                    <InputError title={formik.errors.referral_code} />
                  ) : null}
                </label>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400 text-sm pb-2">
                    Register as :
                  </span>
                  <div className="flex items-center gap-4 w-full">
                    <label
                      htmlFor="student"
                      className="flex items-center justify-center w-[120px] gap-1 border border-gray-400 px-2 py-3 rounded-lg cursor-pointer text-gray-400"
                    >
                      <input
                        name="userTypeId"
                        id="student"
                        checked={formik.values.userTypeId == 4}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value="4"
                        type="radio"
                      />
                      Student
                    </label>
                    <label
                      htmlFor="master"
                      className="flex items-center justify-center w-[120px] gap-1 border border-gray-400 px-2 py-3 rounded-lg cursor-pointer text-gray-400"
                    >
                      <input
                        name="userTypeId"
                        id="master"
                        checked={formik.values.userTypeId == 3}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value="3"
                        type="radio"
                      />
                      Master
                    </label>
                  </div>
                  {formik.touched.userTypeId && formik.errors.userTypeId ? (
                    <InputError title={formik.errors.userTypeId} />
                  ) : null}
                </div>
              </div>
              <button
                className="outline-none  mt-8 bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] shadow-md rounded-full px-8 py-2 text-blue-dark font-semibold uppercase hover:shadow-none transition-all shadow-gold-light_400"
                type="submit"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-16 mb-4 w-full  text-white flex justify-between items-center text-sm">
              <a href="/login" className="mx-auto">
                Already have an account?{" "}
                <span className="text-gold-light_400">Sign In</span>
              </a>
            </div>

            <div className="w-full my-4 flex justify-center items-center">
              <GoogleLoginComponent />
            </div>
          </div>
        </div>
      </div>

      {messageCode === 200 && (
        <div className="fixed inset-0 w-full h-screen flex items-center justify-center z-[1001]">
          <div className="w-full h-full absolute bg-black opacity-65"></div>
          <div className="bg-blue-light z-[1002] p-6 md:p-10 lg:p-14 rounded-lg opacity-100 shadow-lg">
            <div>
              <h5 className="text-2xl capitalize mb-10 font-semibold text-gold-light_400">
                Congratulations.
              </h5>
              <p className="text-white my-3">
                You have successfully signed up.
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <span className="text-gray-200">Go to Login Page.</span>
              <Link to="/login">
                <button className="bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] shadow-xl px-3 py-1 rounded-lg outline-none border-none text-blue-dark fotn-semibold hover:scale-105 duration-75">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
