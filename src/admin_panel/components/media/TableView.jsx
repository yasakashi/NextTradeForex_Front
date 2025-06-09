import { useState } from "react";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import MAterialTable from "../table/material_table";
import { IoTrashOutline } from "react-icons/io5";
import VidoeCover from "../../../asset/video_cover.svg";
import AudioCover from "../../../asset/audio_cover.svg";
import Image from "../../../asset/img/advance.png";

const TableView = ({ data, isLoading }) => {
  const [showModal, setShowModal] = useState(false);

  console.log(data);

  const getFileNameWithoutExtension = (fileName) => {
    return fileName?.replace(/\.[^/.]+$/, "");
  };

  return (
    <div>
      <MAterialTable
        loading={isLoading}
        // setSearchCourses={setSearchLesson}
        rows={data}
        columns={[
          {
            header: "File",
            accessorKey: "file",
            Cell: ({ row, table }) => {
              return (
                <div className="flex flex-col justify-center items-start w-[300px]">
                  <div className="flex items-center gap-2">
                    <div className="size-[50px]">
                      {row?.original?.filecontenttype.includes("image") ? (
                        <img
                          className="w-full h-full bg-contain object-fill"
                          src={row?.original?.fileurl}
                          alt="Img"
                        />
                      ) : row?.original?.filecontenttype.includes("video") ? (
                        <img
                          className="w-full h-full bg-cover"
                          src={VidoeCover}
                          alt="Video"
                        />
                      ) : row?.original?.filecontenttype.includes("audio") ? (
                        <img
                          className="w-full h-full bg-cover"
                          src={AudioCover}
                          alt="Audio"
                        />
                      ) : (
                        <img
                          className="w-full h-full bg-cover"
                          src={Image}
                          alt="Audio"
                        />
                      )}
                    </div>

                    <div className="flex flex-col leading-7">
                      <p className="capitalize text-[#2271b1] font-bold text-base">
                        {getFileNameWithoutExtension(row?.original?.filename)}
                      </p>
                      <span className="text-gray-600 text-sm">
                        {row?.original?.filename}
                      </span>
                    </div>
                  </div>
                  <div className="hidden  z-[1050] relative items-center gap-2">
                    <BorderedButtonPrimary
                      title="Edit"
                      onClick={() => {
                        // navigate(
                        //   `/admin-panel/lesson/categories/edit/${row.original.title}`
                        // );
                      }}
                      style={{ padding: 0, border: "none" }}
                    />

                    <BorderedButtonPrimary
                      title="Delete Permanently"
                      onClick={() => {
                        setActiveRowId(row?.original?.id);
                        setShowModal((prev) => !prev);
                      }}
                      style={{ color: "red", padding: 0, border: "none" }}
                    />
                    <BorderedButtonPrimary
                      title="View"
                      onClick={() => {
                        // navigate(`/learn_to_trade/${row.original.title}`);
                        // navigate(
                        //   `/admin-panel/lesson/categories/${row.original.slug}`
                        // );
                      }}
                      style={{ padding: 0, border: "none" }}
                    />

                    <BorderedButtonPrimary
                      title="Copy URL"
                      onClick={() => {
                        // navigate(`/learn_to_trade/${row.original.title}`);
                        // navigate(
                        //   `/admin-panel/lesson/categories/${row.original.slug}`
                        // );
                      }}
                      style={{ padding: 0, border: "none" }}
                    />

                    <BorderedButtonPrimary
                      title="Download File"
                      onClick={() => {
                        // navigate(`/learn_to_trade/${row.original.title}`);
                        // navigate(
                        //   `/admin-panel/lesson/categories/${row.original.slug}`
                        // );
                      }}
                      style={{ padding: 0, border: "none" }}
                    />

                    {showModal && row?.original?.id === activeRowId ? (
                      <div
                        ref={modalRef}
                        className="absolute -top-5 right-0 z-[1000] rounded-md shadow-md w-[210px] h-auto py-2 bg-[#212327] border border-[#212327]"
                      >
                        <ul>
                          <li className="px-2 py-[6px] flex items-center gap-2 hover:bg-[#41454f] cursor-pointer transition-colors text-red-500">
                            <button
                              onClick={() =>
                                removeCourseHandler(row?.original?.id)
                              }
                              disabled={removeLoading}
                              type="button"
                              className="flex gap-2 disabled:cursor-not-allowed items-center border-none outline-none"
                            >
                              <IoTrashOutline size={14} />
                              Remove Permanently
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            },
          },

          {
            header: "Author",

            Cell: ({ row }) => {
              return (
                <p
                  className="text-blue-800 cursor-pointer"
                  style={{ color: "#2271b1" }}
                >
                  Mariya Markova
                </p>
              );
            },
          },

          {
            header: "Uploaded to",
            enableEditing: false,

            Cell: ({ row }) => {
              return (
                <div className="flex">
                  <h4>Test Desc 19</h4>
                  <span>Detach</span>
                </div>
              );
            },
          },

          {
            header: "Date",
            Cell: ({ row }) => {
              return (
                <div className="flex flex-col text-[#50575e]">
                  <p>
                    {new Date(row?.original?.updatedatetime).toLocaleString()}
                  </p>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default TableView;
