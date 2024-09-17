import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const RespondeTicket = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Link
          to="/admin/tickets"
          className="group cursor-pointer hover:bg-gold-light_400 transition-all w-max p-1 rounded-full border-gold-light_400 border"
        >
          <FaArrowLeft
            className="text-gold-light_400 group-hover:text-white cursor-pointer"
            size={18}
          />
        </Link>
        <h3 className="text-xl text-gray-800 font-semibold">Responde Ticket</h3>
      </div>
      <div className="my-4">
        <div className="space-y-2">
          <div>
            <span className="text-gray-700 font-semibold text-lg mx-1">
              Username:{" "}
            </span>
            <span className="text-gray-600 text-base">AmirBasisi00</span>
          </div>

          <div>
            <span className="text-gray-700 font-semibold text-lg mx-1">
              Subject:{" "}
            </span>
            <span className="text-gray-600 text-base">Lorem, ipsum dolor.</span>
          </div>

          <div>
            <span className="text-gray-700 font-semibold text-lg mx-1">
              Priority:{" "}
            </span>
            <span className="text-gray-600 text-base">Normal</span>
          </div>

          <div>
            <span className="text-gray-700 font-semibold text-lg mx-1">
              Ticket Details:{" "}
            </span>
            <p className="text-gray-600 text-base ml-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
              doloribus sunt aliquam dolorem blanditiis voluptatum perferendis
              incidunt dolorum quasi. Amet?
            </p>
          </div>

          <div>
            <div className="text-gray-700 font-semibold text-lg mx-1">
              Files:{" "}
            </div>
            <div className="text-gray-600 text-base">No file.</div>
          </div>
        </div>
        <div className="my-6 border-t-2 border-gray-200 mb-6 ">
          <h4 className="text-gray-700 text-lg my-2">Your Responde: </h4>
          <CKEditor
            editor={ClassicEditor}
            // data={formik.values.textbody}
            // value={formik.values.textbody}
            onChange={(event, editor) => {
              const data = editor.getData();
              // formik.setFieldValue("textbody", data);
            }}
          />

          <button className="bg-blue-main my-3 text-white px-3 py-1 rounded-md cursor-pointer flex justify-end">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RespondeTicket;
