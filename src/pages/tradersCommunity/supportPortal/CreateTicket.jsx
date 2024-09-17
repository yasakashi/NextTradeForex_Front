import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
  createTicketAction,
  getTicketPriorities,
} from "../../../redux/features/tickeSlice";
import toast from "react-hot-toast";
import CustomBeatLoader from "../../../utils/loaders/CustomBeatLoader";

const CreateTicket = () => {

  const navigate = useNavigate();

  const [detailTemp, setDetailTemp] = useState(0);
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [ticketFile, setTicketFile] = useState(null);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { priorities, prioritiesLoading, createTicketLoading } = useSelector(
    (state) => state.ticket
  );

  const ticketValidation = Yup.object({
    subject: Yup.string().required("Title is required."),
    textbody: Yup.string().required("Content is required."),
  });

  const formik = useFormik({
    initialValues: {
      subject: "",
      textbody: "",
      priorityId: 2,
    },

    validationSchema: ticketValidation,
    onSubmit: (values , {resetForm}) => {
      dispatch(createTicketAction({ axiosPrivate, data: values , toast, resetForm, navigate }));
      console.log(values);
    },
  });

  useEffect(() => {
    dispatch(getTicketPriorities({ axiosPrivate }));
  }, []);
  const removeImage = (i) => {
    let files = images.filter((_, index) => index !== i);
    setImages([...files]);
  };

  const handleTicketImage = (e) => {
    setTicketFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages([...images, reader.result]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="my-20">
      <div className="bg-link-water w-[95%] sm:[93%] md:w-[90%] mx-auto rounded-md p-4">
        <div className="flex justify-between items-center">
          <h4 className="text-gray-700 text-xl">Submit a Support Ticket</h4>
          <Link
            className="px-3 py-1 rounded-md text-white bg-[#73767a] text-sm"
            to="/traders-community/support-portal"
          >
            View All
          </Link>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col space-y-8 my-6"
        >
          <label className="flex flex-col space-y-2">
            <span className="formInputLabel_ticket">Subject</span>
            <input
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="px-3 py-2 outline-none text-gray-700 text-sm border border-[#dcdfe6] rounded-md placeholder:text-sm"
              placeholder="What's this support ticket about?"
            />
            {formik.touched && formik.errors.subject && (
              <span>{formik.errors?.subject}</span>
            )}
          </label>

          <label>
            <span className="formInputLabel_ticket pb-2">Ticket Details</span>
            <div className="text-gray-700 text-sm capitalize flex items-center pt-2">
              <span
                onClick={() => setDetailTemp(0)}
                className="px-2 py-1 border-t border-x "
              >
                Visual
              </span>
              <span
                onClick={() => setDetailTemp(1)}
                className="px-2 py-1 border-t border-x "
              >
                Text
              </span>
            </div>

            {detailTemp === 0 ? (
              <CKEditor
                editor={ClassicEditor}
                data={formik.values.textbody}
                value={formik.values.textbody}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  formik.setFieldValue("textbody", data);
                }}
              />
            ) : detailTemp === 1 ? (
              <div>
                <textarea
                  placeholder="Write here ..."
                  className="w-full outline-[#409eff] outline-[1px] resize-none min-h-[130px] p-4 placeholder:text-sm text-gray-700"
                ></textarea>
              </div>
            ) : null}

            <span className="text-gray-500 text-xs px-1 my-[8px]">
              Please Provide details about your problem.
            </span>
            {formik.touched && formik.errors.subject && (
              <span>{formik.errors?.subject}</span>
            )}
          </label>

          <div className="mt-6">
            <div className="">
              {images?.length ? (
                <>
                  {images.map((image, index) => (
                    <div key={index} className="relative w-max">
                      <img
                        src={image}
                        alt={`upload-${index}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 p-[1px] bg-gray-300 rounded-full"
                      >
                        <IoIosClose className="text-red-600" size={20} />
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="uploadImage"
                    className="w-max px-4 py-[6px] bg-[#09165a38] rounded-lg  shadow-md text-base text-blue-light cursor-pointer"
                  >
                    Click to upload
                  </label>
                  <span className="text-gray-500 text-xs p-1">
                    Supported Types: Photos, CSV, PDF/Docs, Zip, JSON and max
                    file size: 2.0MB
                  </span>
                </div>
              )}

              <input
                type="file"
                name="image"
                id="uploadImage"
                onChange={handleTicketImage}
                className="w-full hidden p-2 rounded bg-white text-black"
                accept="image/png, image/gif, image/jpeg"
              />

              {errorMsg && <div className="text-red-500 mt-1">{errorMsg}</div>}

              <div className="mt-4 flex flex-wrap gap-2"></div>
            </div>
          </div>

          <label className="flex flex-col space-y-2 mb-6">
            <span className="formInputLabel_ticket">Priority</span>
            <select
              name="priorityId"
              value={formik.values.priorityId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="outline-[#409eff] outline-[1px] text-gray-600 text-sm py-1 bg-white pl-3"
            >
              {priorities?.length ? (
                priorities.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item?.name}
                  </option>
                ))
              ) : !prioritiesLoading ? (
                <option className="text-sm text-gray-600">
                  Priorities not found.
                </option>
              ) : null}
            </select>
          </label>

          <div>
            <button className="text-white font-semibold text-sm bg-gold-light_400 px-4 py-[6px] rounded-md">
              {createTicketLoading ? (
                <CustomBeatLoader color="#fff" />
              ) : (
                " Create Ticket"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
