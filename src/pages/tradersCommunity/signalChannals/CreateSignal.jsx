import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import CummunityNavbar from "../../../components/tradersCommunity/Navbar";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import {
  addSignalAction,
  getAnalysisType,
  getEntryPoint,
  getInstrument,
  getMarketCycle,
  getPositionType,
  postSignalImage,
} from "../../../redux/features/signals/SignalSlice";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoIosClose } from "react-icons/io";
import CustomCircleLoader from "../../../utils/loaders/CustomCircleLoader";
import { useNavigate } from "react-router-dom";

const CreateSignal = ({ pageType }) => {
  const signalChannelId = localStorage.getItem("signalChannelId");
  const groupName = localStorage.getItem("groupname");

  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [signalFile, setSignalFile] = useState(null);

  const navigate = useNavigate();

  const addSignalSchema = Yup.object().shape({
    entrypointtypeId: Yup.string().required("Required"),
    sl: Yup.number().required("Required").positive("Must be positive"),
    tp1: Yup.number().required("Required").positive("Must be positive"),
    // tp2: Yup.number().required("Required").positive("Must be positive"),
    // tp3: Yup.number().required("Required").positive("Must be positive"),
    resistance3: Yup.number().positive("Must be positive"),
    resistance2: Yup.number().positive("Must be positive"),
    resistance1: Yup.number().positive("Must be positive"),
    entryPoint: Yup.number().positive("Must be positive"),
    support1: Yup.number().positive("Must be positive"),
    support2: Yup.number().positive("Must be positive"),
    support3: Yup.number().positive("Must be positive"),
    description: Yup.string(),
    // image: Yup.mixed()
    //   .required("Required")
    //   .test(
    //     "fileFormat",
    //     "Unsupported Format",
    //     (value) =>
    //       value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
    //   ),
  });

  const addSignalInitialValues = {
    timeframe_1min: false,
    timeframe_5min: false,
    timeframe_15min: false,
    timeframe_30min: false,
    timeframe_1houre: false,
    timeframe_4houre: false,
    timeframe_8houre: false,
    timeframe_1day: false,
    timeframe_1week: false,
    timeframe_1month: false,
    positiontypeId: 1,
    analysistypeId: 1,
    marketsycleid: 1,
    instrumenttypeid: 1,
    entrypointtypeId: 1,
    sl: "",
    tp1: "",
    tp2: "",
    tp3: "",
    resistance3: "",
    resistance2: "",
    resistance1: "",
    entryPoint: "",
    support1: "",
    support2: "",
    support3: "",
    description: "",
  };

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {
    isLoading,
    analysisTypes,
    positionTypes,
    marketCycles,
    instruments,
    entryPoints,
  } = useSelector((state) => state.addSignal);

  // --------------------dispatch
  useEffect(() => {
    dispatch(getAnalysisType({ axiosPrivate, toast }));
    dispatch(getMarketCycle({ axiosPrivate, toast }));
    dispatch(getPositionType({ axiosPrivate, toast }));
    dispatch(getInstrument({ axiosPrivate, toast }));
    dispatch(getEntryPoint({ axiosPrivate, toast }));
  }, []);

  const removeImage = (i) => {
    let files = images.filter((_, index) => index !== i);
    setImages([...files]);
  };

  const handleSignalImage = (e) => {
    setSignalFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages([...images, reader.result]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    // console.log({ signalFile });
  };

  // useEffect(() => {
  //   // Cleanup function to run when the component unmounts
  //   return () => {
  //     dispatch(clearSignalChannelId());
  //   };
  // }, [dispatch]);

  // //////////////////////////////

  const handleSubmit = async (values) => {

    console.log(JSON.stringify(values))
    try {
      // Step 1: Add signal data
      const addSignalResponse = await dispatch(
        addSignalAction({
          axiosPrivate,
          data: { ...values, signalchannelId: signalChannelId },
          toast,
        })
      );

      if (addSignalResponse?.payload?.messageCode === 200) {
        const formData = await new FormData();
        formData.append("Id", addSignalResponse?.payload?.messageData?.id);
        formData.append("photofile", signalFile);

        const uploadImageResponse = await dispatch(
          postSignalImage({
            axiosPrivate,
            IFormFile: formData,
            toast,
          })
        );

        if (uploadImageResponse.payload?.messageCode === 200) {
          toast.success("Signal image uploaded successfully");
          navigate(`/traders-community/groups/${groupName}/signal-channels`);
          //
        }
      }
    } catch (error) {
      console.error("Error creating signal", error);
      if (error?.message) {
        toast.error(error.message);
      }
    }
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
      <div>
        {pageType !== "groupChat" ? (
          <>
            <CummunityNavbar />
            <section className="relative w-full h-[40vh]">
              <img
                className="w-full h-full absolute inset-0 -z-10"
                src="/assets/slider-bg.png"
                alt=""
              />

              <div className="z-50 flex justify-between items-center p-2 h-full">
                <div className="flex justify-center w-full">
                  <h4 className="text-4xl text-white">Create Signal </h4>
                </div>

                <div className="h-full w-full">
                  <img
                    className="size-full object-cover"
                    src="/assets/breadcrumb_img.png"
                    alt="breadcrumb"
                  />
                </div>
              </div>
            </section>
          </>
        ) : null}
        <div
          className={`${
            pageType !== "groupChat" ? "bg-blue-light" : ""
          } py-10 w-full`}
        >
          <div className="bg-blue-dark w-[80%] md:w-[60%] lg:w-1/2 mx-auto p-4 rounded-lg">
            <Formik
              initialValues={addSignalInitialValues}
              validationSchema={addSignalSchema}
              onSubmit={handleSubmit}
              // onSubmit={(values) => {
              //   dispatch(
              //     addSignalAction({
              //       axiosPrivate,
              //       data: { ...values, signalchannelId: channelId },
              //     })
              //   );

              //   console.log(values);
              // }}
            >
              {({
                values,
                errors,
                touched,
                setFieldValue,
                validateField,
                validateForm,
                handleChange,
              }) => (
                <Form>
                  <div>
                    <span className="text-gray-300 text-base mb-2 uppercase">
                      Position
                    </span>

                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      role="group"
                      aria-labelledby="my-position_radio-group"
                    >
                      {positionTypes.length ? (
                        positionTypes.map((item, index) => (
                          <label key={index} className="flex items-center">
                            <Field
                              className="accent-gold-light_300 cursor-pointer"
                              type="radio"
                              name="positiontypeId"
                              value={item.id}
                              checked={item.id == values.positiontypeId}
                            />
                            <span className="text-white mx-2 text-sm">
                              {item.name}
                            </span>
                          </label>
                        ))
                      ) : (
                        <span className="text-white text-sm my-1">
                          Loading ...
                        </span>
                      )}
                    </div>
                  </div>
                  {/* tiem frames */}
                  <div className="mt-6">
                    <h3 className="text-gray-300 text-base mb-2 uppercase">
                      TimeFrame
                    </h3>
                    <div className="flex items-center flex-wrap text-white gap-2 text-sm cursor-pointer">
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="timeframe_1min"
                          className="accent-gold-light_400 mr-1 scale-105 cursor-pointer"
                        />
                        1 minute
                      </label>
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="timeframe_5min"
                          className="accent-gold-light_400 mr-1 scale-105 cursor-pointer"
                        />
                        5 minutes
                      </label>
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="timeframe_15min"
                          className="accent-gold-light_400 mr-1 scale-105 cursor-pointer"
                        />
                        15 minutes
                      </label>
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="timeframe_30min"
                          className="accent-gold-light_400 mr-1 scale-105 cursor-pointer"
                        />
                        30 minutes
                      </label>
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="timeframe_1hour"
                          className="accent-gold-light_400 mr-1 scale-105 cursor-pointer"
                        />
                        1 hour
                      </label>
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="timeframe_4hour"
                          className="accent-gold-light_400 mr-1 scale-105 cursor-pointer"
                        />
                        4 hours
                      </label>
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="timeframe_8hour"
                          className="accent-gold-light_400 mr-1 scale-105 cursor-pointer"
                        />
                        8 hours
                      </label>
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="timeframe_1day"
                          className="accent-gold-light_400 mr-1 scale-105 cursor-pointer"
                        />
                        1 day
                      </label>
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="timeframe_1week"
                          className="accent-gold-light_400 mr-1 scale-105 cursor-pointer"
                        />
                        1 week
                      </label>
                      <label className="flex items-center">
                        <Field
                          type="checkbox"
                          name="timeframe_1month"
                          className="accent-gold-light_400 mr-1 scale-105 cursor-pointer"
                        />
                        1 month
                      </label>
                    </div>
                  </div>

                  {/* Analysis types */}

                  <div className="flex flex-col mt-6">
                    <h3 className="text-gray-300 text-base mb-2 uppercase">
                      Analysis type
                    </h3>
                    <Field
                      as="select"
                      name="analysistypeId"
                      value={values.analysistypeId}
                      className="bg-gold-light_400 rounded-sm outline-none border-none py-1"
                    >
                      {analysisTypes.length ? (
                        analysisTypes.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))
                      ) : (
                        <option>No Data Available</option>
                      )}
                    </Field>
                  </div>

                  {/* Market Cycle */}

                  <div className="flex flex-col mt-6">
                    <span className="text-gray-300 text-base mb-2 uppercase">
                      Market Cycle
                    </span>
                    <Field
                      as="select"
                      name="marketsycleid"
                      value={values.marketsycleid}
                      className="bg-gold-light_400 rounded-sm outline-none border-none py-1"
                    >
                      {marketCycles.length ? (
                        marketCycles.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))
                      ) : (
                        <option>No Data Available</option>
                      )}
                    </Field>
                  </div>

                  {/* Instrument */}

                  <div className="flex flex-col mt-6">
                    <span className="text-gray-300 text-base mb-2 uppercase">
                      Instrument
                    </span>
                    <Field
                      as="select"
                      name="instrumenttypeid"
                      value={values.instrumenttypeid}
                      className="bg-gold-light_400 rounded-sm outline-none border-none py-1"
                    >
                      {instruments.length ? (
                        instruments.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))
                      ) : (
                        <option>No Data Available</option>
                      )}
                    </Field>
                  </div>

                  {/*  */}
                  <div className="mt-6">
                    <h3 className="text-gray-300 text-base mb-2 uppercase">
                      Trade setup
                    </h3>
                    <div className="mb-4 mt-2">
                      <Field
                        as="select"
                        name="entrypointtypeId"
                        className="w-full p-2 bg-gold-light_400 rounded-sm outline-none border-none"
                      >
                        {entryPoints?.length
                          ? entryPoints.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            ))
                          : null}
                      </Field>
                      <ErrorMessage
                        name="entrypointtypeId"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="entryPoint"
                        placeholder=""
                        className="w-full p-2 outline-none rounded bg-gray-300 text-black"
                      />
                      <ErrorMessage
                        name="sl"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="">
                        <Field
                          name="sl"
                          placeholder="SL"
                          className="w-full p-2 outline-none rounded bg-gray-300 text-black"
                        />
                        <ErrorMessage
                          name="sl"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="">
                        <Field
                          name="tp1"
                          placeholder="TP1"
                          className="w-full p-2 outline-none rounded bg-gray-300 text-black"
                        />
                        <ErrorMessage
                          name="tp1"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="">
                        <Field
                          name="tp2"
                          placeholder="TP2"
                          className="w-full p-2 outline-none rounded bg-gray-300 text-black"
                        />
                        <ErrorMessage
                          name="tp2"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="">
                        <Field
                          name="tp3"
                          placeholder="TP3"
                          className="w-full p-2 outline-none rounded bg-gray-300 text-black"
                        />
                        <ErrorMessage
                          name="tp3"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* range */}

                  <div className="mt-6">
                    <h3 className="text-gray-300 text-base mb-2 uppercase">
                      Range
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="">
                        <Field
                          name="resistance3"
                          placeholder="Resistance3"
                          className="w-full p-2 rounded bg-gray-300 text-black"
                        />
                        <ErrorMessage
                          name="resistance3"
                          component="div"
                          className="text-red-500 mt-1"
                        />
                      </div>
                      <div className="">
                        <Field
                          name="resistance2"
                          placeholder="Resistance2"
                          className="w-full p-2 rounded bg-gray-300 text-black"
                        />
                        <ErrorMessage
                          name="resistance2"
                          component="div"
                          className="text-red-500 mt-1"
                        />
                      </div>
                      <div className="">
                        <Field
                          name="resistance1"
                          placeholder="Resistance1"
                          className="w-full p-2 rounded bg-gray-300 text-black"
                        />
                        <ErrorMessage
                          name="resistance1"
                          component="div"
                          className="text-red-500 mt-1"
                        />
                      </div>
                      <div className="">
                        <Field
                          name="entryPoint"
                          placeholder="Entry Point"
                          className="w-full p-2 rounded bg-gray-300 text-black"
                        />
                        <ErrorMessage
                          name="entryPoint"
                          component="div"
                          className="text-red-500 mt-1"
                        />
                      </div>
                      <div className="">
                        <Field
                          name="support1"
                          placeholder="Support1"
                          className="w-full p-2 rounded bg-gray-300 text-black"
                        />
                        <ErrorMessage
                          name="support1"
                          component="div"
                          className="text-red-500 mt-1"
                        />
                      </div>
                      <div className="">
                        <Field
                          name="support2"
                          placeholder="Support2"
                          className="w-full p-2 rounded bg-gray-300 text-black"
                        />
                        <ErrorMessage
                          name="support2"
                          component="div"
                          className="text-red-500 mt-1"
                        />
                      </div>
                      <div className="">
                        <Field
                          name="support3"
                          placeholder="Support3"
                          className="w-full p-2 rounded bg-gray-300 text-black"
                        />
                        <ErrorMessage
                          name="support3"
                          component="div"
                          className="text-red-500 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  {/* description */}
                  <div className="mt-6">
                    <h3 className="text-gray-300 text-base mb-2 uppercase">
                      description
                    </h3>
                    <div className="mb-4">
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Description"
                        className="w-full p-2 rounded bg-gray-300 text-black h-32"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-gray-300 text-base mb-2 uppercase">
                      upload image
                    </h3>
                    <div className="mb-4">
                      {images?.length ? (
                        <div className="my-4">
                          {images.map((image, index) => (
                            <div
                              key={index}
                              className="relative w-full max-w-[300px] h-[130px] mx-auto"
                            >
                              <img
                                src={image}
                                alt={`upload-${index}`}
                                className="w-full h-full object-cover rounded"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 p-[1px] bg-gray-300 rounded-full"
                              >
                                <IoIosClose
                                  className="text-red-600"
                                  size={20}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <label
                          htmlFor="uploadImage"
                          className="w-full h-[200px] bg-white rounded-lg flex justify-center items-center shadow-lg text-xl text-gray-500 cursor-pointer"
                        >
                          Drop file here or Click to upload
                        </label>
                      )}

                      <input
                        type="file"
                        name="image"
                        id="uploadImage"
                        onChange={handleSignalImage}
                        className="w-full hidden p-2 rounded bg-white text-black"
                        accept="image/png, image/gif, image/jpeg"
                      />

                      {errorMsg && (
                        <div className="text-red-500 mt-1">{errorMsg}</div>
                      )}

                      <div className="mt-4 flex flex-wrap gap-2"></div>
                    </div>
                  </div>

                  {/* ********** submit ************ */}
                  <div className="my-4">
                    <button
                      type="submit"
                      className="text-blue-light px-6 py-3 rounded-lg bg-gold-light_300 hover:bg-gold-light_400 transition-all font-semibold shadow-lg"
                    >
                      Create Signal
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {pageType !== "groupChat" ? <Footer /> : null}
      </div>
    </>
  );
};

export default CreateSignal;
