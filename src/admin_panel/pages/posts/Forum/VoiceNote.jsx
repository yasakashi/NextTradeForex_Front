import { useEffect, useState } from "react";
import { CustomButton } from "../../../../components/ui/CustomButton";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";

const VoiceNote = ({ formik }) => {
  const [openAudioFile, setOPenAudioFile] = useState(false);

  const [audioURL, setAudioURL] = useState(null);
  const isLoading = false;

  useEffect(() => {
    if (formik.values?.audioFile) {
      setAudioURL(URL.createObjectURL(formik.values?.audioFile));
    }
  }, [formik.values?.audioFile]);

  const clearnAuio = () => {
    formik.setFieldValue("audioFile", null);
    setAudioURL(null);
  };

  return (
    <div>
      <div className="w-full">
        {audioURL ? (
          <div className="w-full my-4 h-[100px] flex items-center gap-2 border border-gray-300 p-4 relative">
            <div className="flex items-center gap-4">
              <div className="bg-gray-200 w-[70px] flex items-center justify-center shrink-0 p-2 border border-gray-300">
                <img src="/assets/audio.png" alt="Audio" />
              </div>
              <div className="space-y-2">
                <div className="flex text-nowrap text-sm space-x-2">
                  <h5 className="font-medium text-[14px] text-gray-700">
                    File name :
                  </h5>
                  <span className="text-blue-accent text[13px]">
                    {formik?.values?.audioFile?.name}
                  </span>
                </div>
                <div className="flex text-nowrap text-sm space-x-2">
                  <h5 className="font-medium text-[14px] text-gray-700">
                    File size :
                  </h5>
                  <span>
                    {(formik.values?.audioFile?.size / (1024 * 1024)).toFixed(
                      2
                    )}
                    MB
                  </span>
                </div>
              </div>
            </div>

            <audio
              className="w-full overflow-hidden m-auto rounded-lg object-contain"
              autoPlay
              playsInline
              controls
            >
              <source src={audioURL} />
              Your browser does not support the video tag.
            </audio>

            <div className="absolute top-2 right-2 text-white bg-gray-900 flex items-center justify-center rounded-full p-1 shadow-sm">
              <button onClick={clearnAuio} type="button">
                <MdClose size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 flex items-center gap-2">
            <span className="text-[13px] text-gray-700 font-normal">
              No file selected
            </span>
            <CustomButton
              type="button"
              onClick={() => setOPenAudioFile(true)}
              size="sm"
            >
              Add File
            </CustomButton>
          </div>
        )}

        <div>
          <p className="font-medium text-[14px] text-gray-700">
            Please
            <button className="text-blue-accent hover:underline px-1">
              Click here
            </button>{" "}
            to record a podcast.
          </p>
        </div>
        <LibraryModal
          file={formik?.values?.audioFile}
          set_file={(file) => {
            formik.setFieldValue("audioFile", file);
          }}
          error={formik.errors?.audioFile}
          onBlur={formik.handleBlur}
          has_side_bar_action={false}
          accept_file="Audio"
          title="Add Media"
          open={openAudioFile}
          set_open={setOPenAudioFile}
          onSave={() => setOPenAudioFile(false)}
        />
      </div>
    </div>
  );
};

export default VoiceNote;
