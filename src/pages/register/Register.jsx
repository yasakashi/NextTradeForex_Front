import MainBannerTitle from "../../common/MainBannerTitle";
import HeroTemp from "../../components/HeroTemp";
import InputError from "../../components/InputError";
import CustomCircleLoader from "../../utils/loaders/CustomCircleLoader";
import GoogleLoginComponent from "./GoogleRegister";
import MultiSelect from "../../components/MultiSelect";
import RegisterInputFeild from "../../components/RegisterInputFeild";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  getCountries,
  getStates,
  getcities,
  getfinancialinstruments,
  getforexexperiencelevels,
  getinterestforexs,
  gettargettrainers,
  gettrainingmethods,
  registerAction,
} from "../../redux/features/registerSlice";

import DatePicker from "react-multi-date-picker";

const Register = () => {
  const params = useParams();
  const subRoute = params["*"];

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [financialDropdownOpen, setFainancialDropdownOpen] = useState(false);
  const [targetTrainersDropdownOpen, setTragetTrainersDropdownOpen] =
    useState(false);
  const [trainingMethodDropdownOpen, setTrainingMehodDropdownOpen] =
    useState(false);

  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const {
    userData,
    isLoading,
    messageCode,
    countries,
    states,
    cities,
    forexInterests,
    trainingMethods,
    targetTrainers,
    forexExperincesLevel,
    financialInstruments,
    countriesLoading,
    statesLoading,
    citiesLoading,
  } = useSelector((state) => state.auth);

  // formik
  const registerValidation = Yup.object({
    fname: Yup.string("Name must be string.")
      .required("Name is required.")
      .min(4, "Must be at least 4 characters."),
    lname: Yup.string("Last Name must be string.")
      .required("Last Name is required.")
      .min(4, "Must be at least 4 characters."),
    username: Yup.string()
      .required("Username is required.")
      .matches(/^[^\d]/, "Username cannot start with a number.")
      .min(4, "Must be at least 4 characters."),
    Mobile: Yup.string()
      .required("Mobile number is required.")
      .matches(
        /^(\+\d{1,3}[- ]?)?\d{1,14}$/,
        "Please enter a valid phone number."
      ),
    Email: Yup.string()
      .required("Email is required.")
      .email("Invalid email adddress!"),
    Password: Yup.string()
      .required(
        "Enter a combination of alt least eight numbers, letters and punctuation marks (such as ! and &,@)"
      )
      .min(8, "Password is too short")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
        "password must contain uppercase, lowercase, number and  special character"
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    UserTypeId: Yup.string().required("Choose your role."),

    financialinstrumentIds: Yup.array(),
    trainingmethodIds: Yup.array(),
    targettrainerIds: Yup.array(),
    forexexperiencelevelId: Yup.string(),
    interestforexId: Yup.string(),
    // financialinstrumentIds: Yup.array()
    //   .min(1, "Select at least one financial instrument")
    //   .required("Required"),
    // trainingmethodIds: Yup.array()
    //   .min(1, "Select at least one training method")
    //   .required("Required"),
    // targettrainerIds: Yup.array()
    //   .min(1, "Select at least one target trainer")
    //   .required("Required"),
    // forexexperiencelevelId: Yup.string().required("Required"),
    // interestforexId: Yup.string().required("Required"),
  });

  // "hobbyoftradingfulltime": true

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      username: "",
      Mobile: "",
      Email: "",
      Password: "",
      confirm_password: "",
      address: null,
      nationalcode: null,
      BirthDate: null,
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
      UserTypeId: "4",
      countryid: "",
      stateid: "",
      cityid: "",
      financialinstrumentIds: [],
      trainingmethodIds: [],
      targettrainerIds: [],
      forexexperiencelevelId: "",
      interestforexId: "",
    },
    validationSchema: registerValidation,
    onSubmit: (values) => {
      dispatch(
        registerAction({
          values: {
            ...values,

            UserTypeId: Number(values.UserTypeId),
            interestforexId: Number(values.interestforexId),
            targettrainerIds: convertStrToNum(values.targettrainerIds),
            trainingmethodIds: convertStrToNum(values.trainingmethodIds),
            financialinstrumentIds: convertStrToNum(
              values.financialinstrumentIds
            ),
            forexexperiencelevelId: Number(values.forexexperiencelevelId),
          },
          toast,
        })
      );
    },
  });

  const handleRemoveSkill = (skill) => {
    let newVal = formik.values.trainingmethodIds?.filter(
      (item) => item !== skill
    );
    formik.setFieldValue("trainingmethodIds", newVal);
  };

  const handleTragetTrainersRemove = (skill) => {
    let newVal = formik.values.targettrainerIds?.filter(
      (item) => item !== skill
    );
    formik.setFieldValue("targettrainerIds", newVal);
  };

  const handleFinancialInstrumentsRemove = (skill) => {
    let newVal = formik.values.financialinstrumentIds?.filter(
      (item) => item !== skill
    );
    formik.setFieldValue("financialinstrumentIds", newVal);
  };

  useEffect(() => {
    dispatch(getinterestforexs());
    dispatch(gettrainingmethods());
    dispatch(gettargettrainers());
    dispatch(getforexexperiencelevels());
    dispatch(getfinancialinstruments());
  }, []);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (formik.values?.countryid) {
      dispatch(getStates({ countryid: parseInt(formik.values?.countryid) }));
    }
  }, [formik.values.countryid]);

  useEffect(() => {
    if (formik.values?.countryid && formik.values?.stateid) {
      dispatch(getcities({ stateid: parseInt(formik.values?.stateid) }));
    }
  }, [formik.values?.stateid, formik.values.countryid]);

  const convertStrToNum = (stringArray) => {
    return stringArray.map((item) => Number(item));
  };

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
              <div className="flex flex-col gap-2 mb-3">
                <span className="text-gray-400 text-sm pb-1">
                  Register as :
                </span>
                <div className="flex items-center gap-4 w-full">
                  <label
                    htmlFor="student"
                    className="flex items-center justify-center w-full gap-1 border border-gray-400 px-2 py-3 rounded-lg cursor-pointer text-gray-400"
                  >
                    <input
                      name="UserTypeId"
                      id="student"
                      checked={Number(formik.values.UserTypeId) === 4}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value="4"
                      type="radio"
                    />
                    Student
                  </label>
                  <label
                    htmlFor="indicator"
                    className="flex items-center justify-center w-full gap-1 border border-gray-400 px-2 py-3 rounded-lg cursor-pointer text-gray-400"
                  >
                    <input
                      name="UserTypeId"
                      id="indicator"
                      checked={Number(formik.values.UserTypeId) === 3}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value="3"
                      type="radio"
                    />
                    Instructor
                  </label>
                </div>

                {formik.touched.UserTypeId && formik.errors.UserTypeId ? (
                  <InputError title={formik.errors.UserTypeId} />
                ) : null}
              </div>

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

                <RegisterInputFeild
                  label="Username *"
                  name="username"
                  formik={formik}
                  type="text"
                  placeholder="Username"
                  touched={formik.touched.username}
                  errors={formik.errors.username}
                  errorMsg={formik.errors.username}
                />
                <RegisterInputFeild
                  label="Mobile *"
                  name="Mobile"
                  formik={formik}
                  type="text"
                  placeholder="Mobile"
                  touched={formik.touched.Mobile}
                  errors={formik.errors.Mobile}
                  errorMsg={formik.errors.Mobile}
                />

                <RegisterInputFeild
                  label="Email *"
                  name="Email"
                  formik={formik}
                  type="text"
                  placeholder="Email"
                  touched={formik.touched.Email}
                  errors={formik.errors.Email}
                  errorMsg={formik.errors.Email}
                />
                <RegisterInputFeild
                  label="Address"
                  name="address"
                  formik={formik}
                  type="text"
                  placeholder="Address"
                  touched={formik.touched.address}
                  errors={formik.errors.address}
                  errorMsg={formik.errors.address}
                />

                <label className="space-y-2 flex flex-col">
                  <span className="text-gray-400 text-sm">Birth Date</span>
                  <DatePicker
                    name="BirthDate"
                    calendarPosition="bottom-right"
                    onChange={(date) => {
                      formik.setFieldValue("BirthDate", date.format());
                    }}
                    value={formik.values.BirthDate}
                    format={"YYYY-MM-DD"}
                    inputClass="formInputText"
                    placeholder="Birth Date"
                  />

                  {formik.touched.BirthDate && formik.errors.BirthDate ? (
                    <InputError title={formik.errors.BirthDate} />
                  ) : null}
                </label>

                <label className="space-y-2">
                  <span className="text-gray-400 text-sm">Password *</span>
                  <div className="w-full relative">
                    <input
                      name="Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Password}
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

                  {formik.touched.Password && formik.errors.Password ? (
                    <InputError title={formik.errors.Password} />
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
                  <span className="text-gray-400 text-sm">Country</span>
                  <select
                    className="bg-[#d1b06e] text-blue-light rounded-md py-[5px] px-1 w-full block outline-none border-none shadow-md"
                    name="countryid"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.countryid}
                  >
                    <option value="">select country</option>
                    {countries?.length > 0
                      ? countries.map((country, index) => (
                          <option key={index} value={country?.countryid}>
                            {country?.countryname}
                          </option>
                        ))
                      : null}
                  </select>

                  {formik.touched.countryid && formik.errors.countryid ? (
                    <InputError title={formik.errors.countryid} />
                  ) : null}
                </label>
                <label className="space-y-2">
                  <span className="text-gray-400 text-sm">State</span>
                  <select
                    className="bg-[#d1b06e] text-blue-light rounded-md py-[5px] px-1 w-full block outline-none border-none shadow-md"
                    name="stateid"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.stateid}
                  >
                    <option value="" disabled>
                      select state
                    </option>
                    {states?.length > 0
                      ? states.map((state, index) => (
                          <option key={index} value={state?.stateid}>
                            {state?.statename}
                          </option>
                        ))
                      : null}
                  </select>

                  {formik.touched.stateid && formik.errors.stateid ? (
                    <InputError title={formik.errors.stateid} />
                  ) : null}
                </label>
                <label className="space-y-2">
                  <span className="text-gray-400 text-sm">City</span>
                  <select
                    className="bg-[#d1b06e] text-blue-light rounded-md py-[5px] px-1 w-full block outline-none border-none shadow-md"
                    name="cityid"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cityid}
                  >
                    <option value="" disabled>
                      select city
                    </option>
                    {cities?.length > 0
                      ? cities.map((city, index) => (
                          <option key={index} value={city?.cityid}>
                            {city?.cityname}
                          </option>
                        ))
                      : null}
                  </select>

                  {formik.touched.cityid && formik.errors.cityid ? (
                    <InputError title={formik.errors.cityid} />
                  ) : null}
                </label>

                {formik.values.UserTypeId === "4" && (
                  <>
                    <label className="space-y-2">
                      <span className="text-gray-400 text-sm">
                        Forex Experience Level
                      </span>
                      <select
                        className="bg-[#d1b06e] text-blue-light rounded-md py-[5px] px-1 w-full block outline-none border-none shadow-md"
                        name="forexexperiencelevelId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.forexexperiencelevelId}
                      >
                        {forexExperincesLevel?.length > 0 &&
                          forexExperincesLevel?.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </label>

                    <label className="space-y-2">
                      <span className="text-gray-400 text-sm">
                        Interest in Forex
                      </span>
                      <select
                        className="bg-[#d1b06e] text-blue-light rounded-md py-[5px] px-1 w-full block outline-none border-none shadow-md"
                        name="interestforexId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.interestforexId}
                      >
                        {forexInterests?.length &&
                          forexInterests?.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </label>
                  </>
                )}

                {Number(formik.values.UserTypeId) === 3 && (
                  <>
                    {/* 00000000 Financial Instruments 000000000000 */}
                    <MultiSelect
                      formikTargetValues={formik.values?.financialinstrumentIds}
                      handleRemoveItems={handleFinancialInstrumentsRemove}
                      options={financialInstruments}
                      setDropDownOpen={setFainancialDropdownOpen}
                      dropDownOPen={financialDropdownOpen}
                      handleChange={formik.handleChange}
                      label="Financial Instruments"
                      name="financialinstrumentIds"
                    />

                    {/* 0000000000  Training Methods 0000000000000000 */}
                    <MultiSelect
                      formikTargetValues={formik.values?.trainingmethodIds}
                      handleRemoveItems={handleRemoveSkill}
                      options={trainingMethods}
                      setDropDownOpen={setTrainingMehodDropdownOpen}
                      dropDownOPen={trainingMethodDropdownOpen}
                      handleChange={formik.handleChange}
                      label="Training Methods"
                      name="trainingmethodIds"
                    />

                    {/* 0000000000 Trarget Trainers 0000000000000000 */}
                    <MultiSelect
                      formikTargetValues={formik.values?.targettrainerIds}
                      handleRemoveItems={handleTragetTrainersRemove}
                      options={targetTrainers}
                      setDropDownOpen={setTragetTrainersDropdownOpen}
                      dropDownOPen={targetTrainersDropdownOpen}
                      handleChange={formik.handleChange}
                      label="Target Trainers"
                      name="targettrainerIds"
                    />
                  </>
                )}
                <label className="space-y-2 flex items-center mt-4 gap-3">
                  <span className="text-gray-400 text-base">
                    Referral Code :{" "}
                  </span>
                  <span className="bg-transparent border border-gray-400 px-2 py-3 rounded-lg w-1/2 text-center outline-none placeholder:text-gray-500 placeholder:text-sm text-sm">
                    1
                  </span>
                </label>
                {/* <label className="space-y-2">
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
                </label> */}
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
