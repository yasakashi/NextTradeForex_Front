import HeroTemp from "../../../components/HeroTemp";
import MainBannerTitle from "../../../common/MainBannerTitle";
import Footer from "../../../components/Footer";
import PartnershipItem from "../../../components/partnership/PartnershipItem";
import { FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnershipList } from "../../../redux/features/partnershipSlice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useFormik } from "formik";
import {
  getcities,
  getCountries,
  getStates,
} from "../../../redux/features/registerSlice";
import InputError from "../../../components/InputError";
import toast from "react-hot-toast";
import CustomCircleLoader from "../../../utils/loaders/CustomCircleLoader";

const trainingMethodsOptions = [
  { id: 1, name: "Live" },
  { id: 2, name: "Mentorship" },
  { id: 3, name: "Video Courses" },
  { id: 4, name: "Text Courses" },
];

const financialInstruments = [
  { id: 1, name: "Crypto" },
  { id: 2, name: "Forex" },
  { id: 3, name: "bonds" },
  { id: 4, name: "Stocks" },
  { id: 5, name: "Comodities" },
  { id: 6, name: "Indices" },
];

const targetAudience = [
  { id: 1, name: "Beginner" },
  { id: 2, name: "Intermediate" },
  { id: 3, name: "Expert" },
];

const partnerType = [
  { id: 1, name: "Bronze Partner" },
  { id: 2, name: "Silver Partner" },
  { id: 3, name: "Gold Partner" },
  { id: 4, name: "Platinum Partner" },
  { id: 5, name: "Comodities" },
  { id: 6, name: "Others Partner" },
];

const PatnerShip = () => {
  const [searchType, setSearchType] = useState("capability");

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { partnershipList, partnershipLoading } = useSelector(
    (state) => state.partnership
  );
  const { countries, states, cities } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: null,
      name: null,
      countryid: null,
      stateid: null,
      cityid: null,
      financialinstrumentIds: [],
      trainingmethodIds: [],
      targettrainerIds: [],
      partnertypeIds: [],
    },

    onSubmit: (values) => {
      console.log({ values });
      dispatch(
        getPartnershipList({
          axiosPrivate,
          toast,
          data: {
            ...values,
            trainingmethodIds: values.trainingmethodIds?.length
              ? convertStrToNum(values.trainingmethodIds)
              : null,
            partnertypeIds: values.partnertypeIds?.length
              ? convertStrToNum(values.partnertypeIds)
              : null,
            financialinstrumentIds: values.financialinstrumentIds?.length
              ? convertStrToNum(values.financialinstrumentIds)
              : null,
            targettrainerIds: values.targettrainerIds?.length
              ? convertStrToNum(values.targettrainerIds)
              : null,
          },
        })
      );
      // dispatch(
      //   getPartnershipList({
      //     data: {
      //       ...values,

      //       partnertypeIds: convertStrToNum(values.partnertypeIds),
      //       targettrainerIds: convertStrToNum(values.targettrainerIds),
      //       trainingmethodIds: convertStrToNum(values.trainingmethodIds),
      //       financialinstrumentIds: convertStrToNum(
      //         values.financialinstrumentIds
      //       ),
      //     },
      //     toast,
      //   })
      // );
    },
  });

  useEffect(() => {
    dispatch(getPartnershipList({ axiosPrivate, toast, data: {} }));
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

  const resetSearchHandler = () => {
    dispatch(
      getPartnershipList({
        axiosPrivate,
        toast,
        data: {
          username: null,
          name: null,
          countryid: null,
          stateid: null,
          cityid: null,
          trainingmethodIds: null,
          partnertypeIds: null,
          financialinstrumentIds: null,
          targettrainerIds: null,
        },
      })
    );
  };
  return (
    <div>
      {partnershipLoading && (
        <div className="w-full h-screen fixed inset-0 z-[1001] flex justify-center items-center">
          <div className="w-full h-full absolute bg-black opacity-65"></div>
          <div className="z-[1002]">
            <CustomCircleLoader />
          </div>
        </div>
      )}
      <div className="text-white">
        <HeroTemp needNav={true}>
          <MainBannerTitle title="Partnership" subRoute="Partnersip" />
        </HeroTemp>
      </div>

      <main className="wrapper my-10">
        <div className="border-b border-white">
          <div className="flex">
            <div
              onClick={() => setSearchType("capability")}
              className={`text-gold-light_400 text-lg px-2 py-2 font-semibold cursor-pointer ${
                searchType === "capability" ? "bg-white" : ""
              }`}
            >
              Search by capability
            </div>

            <div
              onClick={() => setSearchType("partnerName")}
              className={`text-gold-light_400 text-lg px-2 py-2 font-semibold cursor-pointer ${
                searchType === "partnerName" ? "bg-white" : ""
              }`}
            >
              Search by Partner Name
            </div>
          </div>
        </div>

        {/* ------------- */}
        <form
          onSubmit={formik.handleSubmit}
          className="my-10 bg-blue-light rounded-lg p-4 w-full sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-[100vh]"
        >
          <div className="space-y-4 flex flex-col">
            {/* <label className="flex flex-col space-y-1"> */}
            {/* <span className="text-sm text-gold-light_400 font-semibold">
                Location
              </span>
              <input
                className="w-full px-4 py-[6px] bg-white rounded-md placeholder:text-gray-600 placeholder:text-bases outline-none"
                type="text"
                placeholder="Enter City, State Or Country"
              />
            </label> */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <label className="space-y-2">
                <span className="text-gray-400 text-sm">Country</span>
                <select
                  className="bg-white text-blue-light rounded-md py-[5px] px-1 w-full block outline-none border-none shadow-md"
                  name="countryid"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.countryid}
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

                {formik.touched.countryid && formik.errors.countryid ? (
                  <InputError title={formik.errors.countryid} />
                ) : null}
              </label>
              <label className="space-y-2">
                <span className="text-gray-400 text-sm">State</span>
                <select
                  className="bg-white text-blue-light rounded-md py-[5px] px-1 w-full block outline-none border-none shadow-md"
                  name="stateid"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.stateid}
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

                {formik.touched.stateid && formik.errors.stateid ? (
                  <InputError title={formik.errors.stateid} />
                ) : null}
              </label>
              <label className="space-y-2">
                <span className="text-gray-400 text-sm">City</span>
                <select
                  className="bg-white text-blue-light rounded-md py-[5px] px-1 w-full block outline-none border-none shadow-md"
                  name="cityid"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cityid}
                >
                  <option>
                    select city
                  </option>
                  {cities?.length
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
            </div>

            {searchType === "partnerName" ? (
              <label className="flex flex-col space-y-1">
                <span className="text-sm text-gold-light_400 font-semibold">
                  Partner Name
                </span>
                <input
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-[6px] bg-white rounded-md placeholder:text-gray-600 placeholder:text-bases outline-none"
                  type="text"
                  placeholder="Enter Partner Name"
                />
              </label>
            ) : null}
          </div>
          {searchType === "capability" ? (
            <div className="mt-6">
              <PartnershipItem
                name="trainingmethodIds"
                handleChange={formik.handleChange}
                value={formik.values.trainingmethodIds}
                title="Training Methods"
                options={trainingMethodsOptions}
              />

              <PartnershipItem
                name="financialinstrumentIds"
                handleChange={formik.handleChange}
                value={formik.values.financialinstrumentIds}
                title="Financial Instruments"
                options={financialInstruments}
              />

              <PartnershipItem
                name="targettrainerIds"
                handleChange={formik.handleChange}
                value={formik.values.targettrainerIds}
                title="Target Audience"
                options={targetAudience}
              />

              <PartnershipItem
                name="partnertypeIds"
                handleChange={formik.handleChange}
                value={formik.values.partnertypeIds}
                title="Partner type"
                options={partnerType}
              />
            </div>
          ) : null}

          <div className="flex items-center gap-3 my-5">
            <button
              type="submit"
              className="btn-bg-grandient_1 px-6 py-2 rounded-lg txt-sm"
            >
              Search
            </button>
            <button
              className="flex items-center gap-2 text-sm hover:underline transition-all text-white"
              onClick={resetSearchHandler}
            >
              <FiRefreshCw className="text-white" size={16} />
              <span>Reset Search</span>
            </button>
          </div>
        </form>

        {/* -------------s */}
        <div className="bg-blue-light p-4 rounded-sm overflow-x-scroll">
          <table className=" text-gray-900 w-full min-w-[1000px]">
            <thead className="sticky top-0 text-gray-900">
              <tr className="text-gold-light_400 text-xl uppercase">
                <th className="p-4 font-normal border border-[#ffffff12]">
                  PARTNER NAME
                </th>
                <th className="p-4 font-normal border border-[#ffffff12]">
                  TRAINING METHODS
                </th>
                <th className="p-4 font-normal border border-[#ffffff12]">
                  FINANCIAL INSTRUMENTS
                </th>
                <th className="p-4 font-normal border border-[#ffffff12]">
                  TARGET AUDIENCE
                </th>
                <th className="p-4 font-normal border border-[#ffffff12]">
                  VIEW PROFILE
                </th>
              </tr>
            </thead>

            <tbody className="">
              {partnershipList?.length &&
                partnershipList.map((item, index) => (
                  <tr key={index} className="">
                    <td className="p-3 border border-[#ffffff12] text-center ">
                      <div className="flex flex-col items-center w-full h-full px-3 md:flex-row md:items-start gap-3 py-3 text-lg">
                        <span className="text-white uppercase text-nowrap">
                          {item?.fname} {item?.lname}
                          {!item?.fname && !item?.lname && item?.username}
                        </span>
                        <img
                          src="/assets/medals/bronze.png"
                          alt="Bronze Medal"
                        />
                      </div>
                    </td>
                    <td className="p-3 border border-[#ffffff12] text-center flex items-center gap-2 flex-wrap">
                      <div className="flex items-center flex-wrap gap-2 w-full h-full">
                        {item.trainingmethods.length > 0 &&
                          item.trainingmethods?.map((trainingmethod) => (
                            <span
                              key={trainingmethod.id}
                              className="text-[15px] text-gold-light_400 border border-[#ffffff12] px-2 py-1 rounded-lg"
                            >
                              {trainingmethod?.name}
                            </span>
                          ))}
                      </div>
                    </td>

                    <td className="p-3 border border-[#ffffff12] text-center">
                      <div className="flex items-center flex-wrap gap-2 w-full h-full">
                        {item.financialinstruments.length > 0 &&
                          item.financialinstruments?.map(
                            (financialinstrument) => (
                              <span
                                key={financialinstrument.id}
                                className="text-[15px] text-gold-light_400 border border-[#ffffff12] px-2 py-1 rounded-lg"
                              >
                                {financialinstrument?.name}
                              </span>
                            )
                          )}
                      </div>
                    </td>
                    <td className="p-3 border border-[#ffffff12] text-center ">
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.targettrainers.length > 0 &&
                          item.targettrainers?.map((targettrainer) => (
                            <span
                              key={targettrainer.id}
                              className="text-[15px] text-gold-light_400 border border-[#ffffff12] px-2 py-1 rounded-lg"
                            >
                              {targettrainer?.name}
                            </span>
                          ))}
                      </div>
                    </td>

                    <td className="p-3 border border-[#ffffff12] text-center">
                      <Link
                        to={`/partnership/profile-view/${item?.userid}`}
                        className="btn-bg-gradient_2 px-3 py-2 rounded-[25px] text-sm text-nowrap outline-none"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))}

              {!partnershipList?.length && !partnershipLoading && (
                <tr className="py-10 text-center text-white">
                  <td colSpan={5}>
                    <span className="flex justify-center items-center text-center mx-auto">
                      NO DATA FOUND
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PatnerShip;
