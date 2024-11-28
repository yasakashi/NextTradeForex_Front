import { useFormik } from "formik";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import { CustomButton } from "../../../../components/ui/CustomButton";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";
import { useEffect, useState } from "react";
import CustomRadioButton from "../../categories/view/components/customRadioButton";
import ExcerptComponent from "../../../../pages/profile/new_course_components/excerpt_component";
import PublishComponent from "../../../../pages/profile/new_course_components/publish_component";
import FeaturedImageComponent from "../../../../pages/profile/new_course_components/featured_image_component";
import { MdClose } from "react-icons/md";

const AddNewPodcast = () => {
  const [openAudioFile, setOPenAudioFile] = useState(false);

  const [audioURL, setAudioURL] = useState(null);
  const isLoading = false;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      audioFile: null,
      downloadable: true,
      subTitleLanguage: "",
      subTitleFile: null,
      excerpt: "",
      featuredImage: null,
    },
  });

  useEffect(() => {
    if (formik.values?.audioFile) {
      setAudioURL(URL.createObjectURL(formik.values?.audioFile));
    }
  }, [formik.values?.audioFile]);

  const clearnAuio = () => {
    formik.setFieldValue("audioFile", null);
    setAudioURL(null)
  };

  return (
    <div className="flex flex-col px-8 py-10">
      <h1 className="font-semibold text-2xl text-white mb-4">
        Add New Podcast
      </h1>

      {console.log(formik.values)}
      <form
        onSubmit={formik.handleSubmit}
        className="space-x-0 lg:space-x-4 grid grid-cols-1 lg:grid-cols-4 items-start"
      >
        <div className="col-span-1 lg:col-span-3">
          <CustomTextInput
            name="title"
            placeholder="Add title"
            className="border border-gray-700 py-[10px] placeholder:text-sm rounded-sm"
            value={formik.values?.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik?.touched?.title ? formik.errors?.title : ""}
          />
          <NewCourceCard title="Podcast">
            <div className="w-full p-4 flex flex-col relative space-y-8">
              {/* upload podcast */}
              <div className="border-b border-gray-300 pb-4">
                <h5 className="font-medium text-[14px] text-gray-700">
                  Podcast
                  <span className="text-red-600">*</span>
                </h5>
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
                              {(
                                formik.values?.audioFile?.size /
                                (1024 * 1024)
                              ).toFixed(2)}
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

              <label className="space-y-2">
                <h5 className="font-medium text-[14px] text-gray-700">
                  Description
                  <span className="text-red-600">*</span>
                </h5>
                <CustomTextArea
                  name="description"
                  value={formik.values?.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-[200px]"
                  error={
                    formik.touched.description
                      ? formik.errors.description
                      : null
                  }
                />
              </label>

              <div></div>
            </div>
          </NewCourceCard>

          {/* excerpt */}
          <ExcerptComponent name="excerpt" formik={formik} />

          <div className="lg:hidden space-y-4">
            <FeaturedImageComponent name="featuredImage" formik={formik} />
          </div>

          {/* categories */}
          <NewCourceCard title="Categories">
            <div className="p-4">categories</div>
          </NewCourceCard>

          <div className="lg:hidden space-y-4">
            <PublishComponent isLoading={isLoading} />
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <PublishComponent isLoading={isLoading} />
          <FeaturedImageComponent name="featuredImage" formik={formik} />
        </div>
      </form>
    </div>
  );
};
export default AddNewPodcast;
