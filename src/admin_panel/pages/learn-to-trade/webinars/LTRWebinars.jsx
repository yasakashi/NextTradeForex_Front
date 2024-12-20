import React, { useRef, useState } from "react";
import MAterialTable from "../../../components/table/material_table";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { useNavigate } from "react-router-dom";
import {
 
  useGetLTRWebinarsQuery,
  useRemoveLTRPodcastMutation,
} from "../../../../redux/features/learnToTrade/LearnToTradeApi";
import { IoTrashOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import useClickOutside from "../../../../hooks/useClickOutside";
import CustomRadioButton from "../../categories/view/components/customRadioButton";
import AdminPanelTitle from "../../../components/AdminPanelTitle";

const LTRWebinars = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeRowId, setActiveRowId] = useState("");

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const [removeLTRPodcast, { isLoading: removeLoading }] =
    useRemoveLTRPodcastMutation();

  const modalRef = useRef(null);

  useClickOutside(modalRef, () => {
    setShowModal(false);
  });

  const {
    data: { messageData: webinars } = { messageData: [] },

    isLoading,

    refetch: refetchCourses,
  } = useGetLTRWebinarsQuery({
    data: {
      id: null,
      fromdateAndTime: null,
      todateAndTime: null,
      title: null,
      categoryid: null,
      pageindex: 1,
      rowcount: 21,
    },
  });

  const removeCourseHandler = async (id) => {
    const removeRes = await removeLTRPodcast({ data: { Id: id } });

    if (removeRes?.data?.messageCode === 200) {
      setShowModal(false);
      toast.success("Podcast removed.");
      refetchCourses();
      setSearchInput("");
    }
  };

  return (
    <div className="flex flex-col px-8 py-10">
      {/* <h1 className="font-semibold text-2xl text-white mb-4">Webinars</h1> */}
      <AdminPanelTitle title="Webinars" />
      <div>
        <CustomButton
          onClick={() =>
            navigate("/admin-panel/learn-to-trade/webinars/add-new-webinar")
          }
          className=" mb-10 mt-6"
          variant="outlined"
          size="sm"
        >
          Add New Webinar
        </CustomButton>
      </div>

      <MAterialTable
        loading={isLoading}
        setSearchCourses={setSearchInput}
        searchCourses={searchInput}
        rows={webinars}
        columns={[
          {
            header: "Title",
            accessorKey: "title",
            Cell: ({ row, table }) => {
              return (
                <div className="flex flex-col justify-center items-start w-48">
                  <p className="capitalize text-[#2271b1] font-bold">
                    {row?.original?.title}
                  </p>
                  <div className="flex z-[1050] relative items-center justify-between">
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
                      title="Trash"
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
            header: "Date",
            Cell: ({ row }) => {
              return (
                <div className="flex flex-col text-[#50575e] text-sm">
                  Published 2023/09/26 at 5:06 pm
                </div>
              );
            },
          },
          {
            header: "Category",

            Cell: ({ row }) => {
              return (
                <p
                  className="text-blue-800 cursor-pointer"
                  style={{ color: "#2271b1" }}
                >
                  Popular
                </p>
              );
            },
          },

          {
            header: "Is Free",
            enableEditing: false,

            Cell: ({ row }) => {
              return (
                <div className="flex">
                  <CustomRadioButton label="Yes" checked={false} />
                  <span className="w-2"></span>
                  <CustomRadioButton label="No" />
                </div>
              );
            },
          },
          {
            header: "Is Visible",
            enableEditing: false,
            Cell: ({ row }) => {
              return (
                <div className="flex">
                  <CustomRadioButton label="Yes" checked={false} />
                  <span className="w-2"></span>
                  <CustomRadioButton label="No" />
                </div>
              );
            },
          },
          {
            header: "Lesson Category",
            enableEditing: false,

            Cell: ({ row }) => {
              return (
                <div className="flex flex-col">
                  <CustomRadioButton label="All" checked={true} />
                  <CustomRadioButton label="Newbie" checked={false} />
                  <CustomRadioButton label="Intermidiate" checked={false} />
                  <CustomRadioButton label="Advanced" checked={false} />
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default LTRWebinars;
