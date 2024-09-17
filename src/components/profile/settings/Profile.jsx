import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { updateUserProfile } from "../../../redux/features/userDataSlice";
import { FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
   const [query, setQuery] = useState("");
   const [isOpen, setIsOpen] = useState(false);

   const options = [
     "amir1basir1",
     "amir1",
     "basir1",
     "amir1 basir1",
     "basir1 amir1",
   ];

   const filteredOptions = options.filter((option) =>
     option.toLowerCase().includes(query.toLowerCase())
   );

  const updateUserValidation = Yup.object({
    address: Yup.string().nullable().min(5, "Address is too short."),
    companyname: Yup.string()
      .nullable()
      .matches(/^[^\d]/, "Company name cannot start with a number"),
    fname: Yup.string()
      .nullable()
      .matches(
        /^[a-zA-Z]+$/,
        "First name cannot contain numbers or special characters"
      ),
    legalNationalCode: Yup.string()
      .nullable()
      .matches(/^[0-9]+$/, "Legal National Code cannot contain any characters"),
    lname: Yup.string()
      .nullable()
      .matches(/^[a-zA-Z]+$/, "Last name cannot contain numbers"),
    mobile: Yup.string()
      .nullable()
      .matches(/^\d{10,15}$/, "Mobile number must be between 10 and 15 digits"),
    postalcode: Yup.string().nullable(),
    taxcode: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      userid: user?.userid || null,
      parentUserId: user?.parentUserId || null,
      userTypeId: user?.userTypeId || null,
      personTypeId: null,
      username: user?.username || "",
      fname: user?.fname || "",
      lname: user?.lname || "",
      nationalcode: user?.nationalcode || "",
      sex: 1,
      marriedstatusid: 0,
      birthDate: "",
      mobile: "",
      taxcode: "",
      legalNationalCode: "",
      companyname: "",
      companyregisterdate: "",
      postalcode: "",
      address: "",
      bio: "",
      skill: "",
    },
    validationSchema: updateUserValidation,
    onSubmit: async (values) => {
      dispatch(updateUserProfile({ axiosPrivate, data: values, toast }));
    },
  });

  return (
    <div className="my-10">
      <div className="my-10">
        <div className="relative  flex items-center md:items-end  z-50 p-4 rounded-lg shadow-lg w-full h-[210px] md:h-[250px] text-white">
          {/* background img */}
          <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden -z-[1]">
            <div className="bg-gradient-to-t  from-black via-[#00000084] to-[#00000091] absolute inset-0 z-0"></div>
            <img
              src="/assets/profile/cover-photo.jpg"
              alt="cover Img"
              className="object-cover rounded-lg w-full h-full z-10"
            />
          </div>

          {/* content  */}

          <div className="z-50 px-4 md:px-10 flex items-center justify-between w-full gap-4 -mb-10">
            <div className="w-[50px] h-[50px] shrink-0 md:size-[120px] rounded-full border-4 border-collapse z-32">
              <img
                className="size-full rounded-full z-20 shrink-0"
                src="/assets/mystery-group-50.png"
                alt="group"
              />
            </div>
            <div className="">
              <button className="text-blue-light font-semibold text-base bg-gold-light_400 px-4 py-2 rounded-md mt-4 flex items-center gap-2">
                <FaCamera size={16} />
                Upload cover photo
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-end gap-4 text-gray-300 text-sm py-2 px-1">
          <span>Profile Photo Size: 200x200 pixels </span>
          <span>Cover Photo Size: 700x430 pixels</span>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-6">
        <div className="flex justify-center flex-col md:flex-row gap-6">
          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">First Name</span>
            <input
              name="fname"
              type="text"
              value={formik.values.fname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="First Name"
            />
            {formik.touched.fname && formik.errors.fname && (
              <span className="text-red-600 text-sm p-1">
                {formik.errors?.fname}
              </span>
            )}
          </label>

          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">Last Name</span>
            <input
              name="lname"
              type="text"
              value={formik.values.lname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="Last Name"
            />
            {formik.touched.lname && formik.errors.lname && (
              <span className="text-red-600 text-sm p-1">
                {formik.errors?.lname}
              </span>
            )}
          </label>
        </div>

        <div className="flex justify-center flex-col md:flex-row gap-6">
          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">Username</span>
            <input
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              readonly="readonly"
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="username"
            />
            {formik.touched.username && formik.errors.username && (
              <span className="text-red-600 text-sm p-1">
                {formik.errors?.username}
              </span>
            )}
          </label>

          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">Mobile</span>
            <input
              name="mobile"
              type="text"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="Mobile number"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <span className="text-red-600 text-sm p-1">
                {formik.errors?.mobile}
              </span>
            )}
          </label>
        </div>

        <div className="flex justify-center flex-col md:flex-row gap-6 mt-4">
          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">
              Postal Code
            </span>
            <input
              name="postalcode"
              type="text"
              value={formik.values.postalcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="Postal Code"
            />
            {formik.touched.postalcode && formik.errors.postalcode && (
              <span>{formik.errors.postalcode}</span>
            )}
          </label>

          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">Birth Date</span>
            <input
              name="birthDate"
              type="date"
              value={formik.values.birthDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="Birth Date"
            />
            {formik.touched.birthDate && formik.errors.birthDate && (
              <span>{formik.errors.birthDate}</span>
            )}
          </label>
        </div>

        {/* <div className="flex justify-center flex-col md:flex-row gap-6 mt-4">
          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">
              Martial Status
            </span>
            <select
              name="marriedstatusid"
              value={formik.values.marriedstatusid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
            >
              <option value="0" label="Single" />
              <option value="1" label="Married" />
            </select>
            {formik.touched.marriedstatusid &&
              formik.errors.marriedstatusid && (
                <span>{formik.errors.marriedstatusid}</span>
              )}
          </label>

          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">Sex</span>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  name="sex"
                  type="radio"
                  value="1"
                  checked={formik.values.sex == 1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio"
                />
                <span className="text-white">Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  name="sex"
                  type="radio"
                  value="2"
                  checked={formik.values.sex == 2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-radio"
                />
                <span className="text-white">Female</span>
              </label>
            </div>
            {formik.touched.sex && formik.errors.sex && (
              <span>{formik.errors.sex}</span>
            )}
          </label>
        </div> */}

        <div className="flex justify-center flex-col md:flex-row gap-6">
          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">Address</span>
            <input
              name="address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="Address"
            />
            {formik.touched.address && formik.errors.address && (
              <span>{formik.errors.address}</span>
            )}
          </label>
        </div>

        {/* <div className="flex justify-center flex-col md:flex-row gap-6 mt-4">
          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">Tax Code</span>
            <input
              name="taxcode"
              type="text"
              value={formik.values.taxcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="Tax Code"
            />
            {formik.touched.taxcode && formik.errors.taxcode && (
              <span>{formik.errors.taxcode}</span>
            )}
          </label>

          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">
              Legal National Code
            </span>
            <input
              name="legalNationalCode"
              type="text"
              value={formik.values.legalNationalCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="Legal National Code"
            />
            {formik.touched.legalNationalCode &&
              formik.errors.legalNationalCode && (
                <span>{formik.errors.legalNationalCode}</span>
              )}
          </label>
        </div> */}

        <div className="flex justify-center flex-col md:flex-row gap-6 mt-4">
          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">
              Company Name
            </span>
            <input
              name="companyname"
              type="text"
              value={formik.values.companyname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="Company Name"
            />
            {formik.touched.companyname && formik.errors.companyname && (
              <span>{formik.errors.companyname}</span>
            )}
          </label>
        </div>

        <div className="flex justify-center flex-col md:flex-row gap-6 mt-4">
          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">
              Company Register Date
            </span>
            <input
              name="companyregisterdate"
              type="date"
              value={formik.values.companyregisterdate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="Company Register Date"
            />
            {formik.touched.companyregisterdate &&
              formik.errors.companyregisterdate && (
                <span>{formik.errors.companyregisterdate}</span>
              )}
          </label>
        </div>

        <div className="flex justify-center flex-col md:flex-row gap-6 mt-4">
          <label className="flex flex-col space-y-2 w-full">
            <span className="text-white text-base font-medium">
              Skill/Occupation
            </span>
            <input
              name="skill"
              type="text"
              value={formik.values.skill}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-3 py-3 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="Company Name"
            />
            {formik.touched.skill && formik.errors.skill && (
              <span>{formik.errors.skill}</span>
            )}
          </label>
        </div>

        <div>
          <span className="text-white text-base mb-2 font-medium">Bio</span>
          <label className="w-full">
            <CKEditor
              editor={ClassicEditor}
              data={formik.values.bio}
              value={formik.values.bio}
              onChange={(event, editor) => {
                const data = editor.getData();
                formik.setFieldValue("bio", data);
              }}
            />
          </label>
        </div>

        <div className="my-2">
          <span className="text-white text-base mb-2 font-medium">
            Display name publicly as
          </span>
          <div className="relative w-80 my-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 100)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
              placeholder="Search ..."
            />
            {isOpen && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onMouseDown={() => setQuery(option)}
                    >
                      {option}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>
        </div>

        <div>
          <button className="text-blue-light font-semibold text-base bg-gold-light_400 px-4 py-2 rounded-md mt-4">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
