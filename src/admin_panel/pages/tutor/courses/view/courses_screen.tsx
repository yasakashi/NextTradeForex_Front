import React from "react";
import MaterialTable from "../../../../components/table/material_table";
import CustomRadioButton from "../../../categories/view/components/customRadioButton";
import BorderedButtonPrimary from "../../../../../common/bordered_button_primary";
import { MRT_Row } from "material-react-table";
import DeleteMenuModal from "../../../categories/view/components/delete_menu_modal";
import temp from "../../../../../asset/img/play-button-arrow.svg";
import {
  CustomSelectBox,
  MySelectBox,
} from "../../../../../pages/profile/new_course_components/custom_select_box";
import useCourses from "../hook/use_courses";
import { useNavigate } from "react-router-dom";
import store from "../../../../../redux/store";
import { set_course_data_state } from "../../../../../redux/features/courseSlise";
import ContainedButtonPrimary from "../../../../../common/contained_button_primary";
import { publish_course_api } from "../services/publish_course_api";
const CoursesScreen = () => {
  const [open_delete_dialog, set_open_delete_dialog] = React.useState<{
    open: boolean;
    row?: MRT_Row<any>;
  }>({ open: false });
  const navigate = useNavigate();
  const [courses_type, set_courses_type] = React.useState(0);
  const { courses } = useCourses({
    search: { courseStatusId: courses_type },
    reload: courses_type,
  });

  return (
    <div className="flex flex-col px-8 py-8">
      <h1 className="font-semibold text-2xl text-white mb-4">Courses</h1>
      <MaterialTable
        RenderTopCustom={({ table }) => {
          return (
            <MySelectBox 
            style={{position:"absolute",top:24,left:280,}}
              value={courses_type}
              fullWidth={false}
              onChange={(val) => {
                set_courses_type(val);
              }}
              options={[
                { title: "Draft", value: 0 },
                { title: "Pending", value: 1 },
                { title: "Published", value: 3 },
              ]}
            />
          );
        }}
        rows={courses as any[]}
        columns={[
          {
            header: "Title",
            accessorKey: "coursename",
            Cell: ({ row, table }) => {
              return (
                <div className="flex items-center">
                  {/* // @ts-ignore */}
                  <img
                    src={temp as unknown as string}
                    alt=""
                    style={{ width: 50, height: 30 }}
                  />
                  <div className="flex flex-col ml-3">
                    <p
                      style={{
                        color: "#2271b1",
                        fontWeight: "bold",
                        marginBottom: 8,
                      }}
                    >
                      {row.original?.coursename}
                    </p>
                    <div className="flex flex-row" style={{ minWidth: 290 }}>
                      {["Topic", "Lesson", "Quiz", "Assignment"].map(
                        (item, i) => {
                          return (
                            <p
                              key={item}
                              className="mr-2 font-semibold text-gray-500"
                            >
                              {item}:{" "}
                              <b className="text-black">
                                {i === 1 ? row.original?.lessencount : 0}
                              </b>
                            </p>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              );
            },
          },
          {
            header: "Category",
            accessorKey: "coursetgas",
            Cell: ({ row }) => {
              return <div className="w-64">{row.original?.coursetgas}</div>;
            },
          },
          {
            header: "Author",
            accessorKey: "ownerusername",
            Cell: ({ row }) => {
              return (
                <div className="flex items-center">
                  <p
                    style={{
                      backgroundColor: "#007cba",
                      borderRadius: 50,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 40,
                      height: 40,
                      color: "white",
                    }}
                  >
                    {String(row.original?.ownerusername).slice(0, 2)}
                  </p>
                  <div className="ml-2">
                    <p className="font-semibold">
                      {row.original?.ownerusername}
                    </p>
                    <p className="font-semibold"></p>
                  </div>
                </div>
              );
            },
          },
          {
            header: "Price",
            accessorKey: "courseprice",
            Cell: ({ row }) => {
              return (
                <p className="font-semibold">
                  {!!row.original?.courseprice
                    ? row.original?.courseprice
                    : "Free"}
                </p>
              );
            },
          },
          {
            header: "Date",
            accessorKey: "registerdatetime",
            Cell: ({ row }) => {
              return (
                <div className="flex flex-col">
                  {new Date(
                    row.original?.registerdatetime || ""
                  ).toLocaleDateString()}
                </div>
              );
            },
          },
          {
            header: " ",
            Cell: ({ row }) => { 
              
              return (
                <div className="flex items-center">
                  <CustomSelectBox
                    fullWidth={false}
                    options={[
                      { title: "Publish", value: "publish" },
                      { title: "Pending", value: "pending" },
                      { title: "Trash", value: "trash" },
                      { title: "Draft", value: "draft" },
                      { title: "Private", value: "private" },
                    ]}
                  />
                  <BorderedButtonPrimary
                    onClick={() => {
                      navigate(`/course/${row.original?.id}`);
                      store.dispatch(set_course_data_state(row.original));
                    }}
                    title="View Course"
                    style={{ width: 120, margin: "0px 16px" }}
                  />
                  <ContainedButtonPrimary
                    onClick={() => {
                      navigate(
                        `/course/attachments/${row.original?.id}/${row.original?.coursename|| "Undefined"}`
                      );
                    }}
                    style={{ width: 160 }}
                    title="Course Atachments"
                  />
                  <ContainedButtonPrimary
                    onClick={() => {
                      publish_course_api({
                        course_id: row.original?.id,
                        course_data: row.original,
                      });
                    }}
                    style={{ width: 100, margin: "0px 16px" }}
                    title={
                      row.original?.courseStatusId === 0
                        ? "Publish"
                        : "Published"
                    }
                  />
                  <ContainedButtonPrimary
                    onClick={() => {}}
                    style={{ width: 100 }}
                    title="Republish"
                  />
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default CoursesScreen;
