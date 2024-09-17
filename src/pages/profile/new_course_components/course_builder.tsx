import React from "react";
import NewCourceCard, { CustomDivider } from "./new_cource_card";
import ContainedButtonPrimary from "../../../common/contained_button_primary";
import ModalLayout from "../../../common/modal_layout";
import { Checkbox, Chip, TextField } from "@mui/material";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { KeyboardArrowDown } from "@mui/icons-material";
import { CgClose } from "react-icons/cg";
import CustomTextField, {
  CustomTextArea,
} from "../../../common/custom_text_field";
import { CiWarning } from "react-icons/ci";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import { Form, Formik } from "formik";
import { CustomSelectBox } from "./custom_select_box";
import { Autocomplete } from "@mui/material";
import { add_course_topics_api } from "../../../admin_panel/pages/tutor/courses/course_atachments/service/course_topics_api";
import { useParams } from "react-router-dom";

const CourseBuilder = () => {
  const [is_open, set_is_open] = React.useState(false);
  return (
    <NewCourceCard title={"Course Builder"}>
      <div className="p-4">
        <ContainedButtonPrimary
          // icon={<PlusCircleIcon className="size-6 text-blue-500"/>}
          title={"Add new topic"}
          onClick={() => set_is_open((pre) => !pre)}
        />
        <AddTopic is_open={is_open} set_is_open={set_is_open} />
      </div>
    </NewCourceCard>
  );
};

export default CourseBuilder;
export const AddTopic = ({
  is_open,
  set_is_open,
  set_topics_to_list,
}: {
  set_is_open?: (val: boolean) => void;
  is_open: boolean;
  set_topics_to_list?: (val: any) => void;
}) => {
  const items = [
    { label: "lesson 1", id: "lesson1" },
    { label: "lesson 2", id: "lesson2" },
    { label: "lesson 3", id: "lesson3" },
  ] as menuType[];
  const { id } = useParams();
  return (
    <Formik
      initialValues={{ name: "", summery: "", pre_lessons: [] }}
      onSubmit={(values, props) => {
        add_course_topics_api({
          name: values.name,
          courseId: id,
          registerdatetime: new Date(),
        })
          .then((res) => {
            set_topics_to_list?.(res);
            props.resetForm();
          })
          .catch((err) => {});
      }}
    >
      {(formik) => {
        return (
          <Form>
            <ModalLayout onClose={set_is_open} open={is_open}>
              <div
                style={{
                  display: "flex",
                  minWidth: "50vw",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <h4 style={{ fontWeight: 600 }}>Add Topic</h4>
                  <button onClick={() => set_is_open?.(false)}>
                    <CgClose style={{}} />
                  </button>
                </div>
                <CustomDivider />
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 600 }} className="pb-2">
                    Topic Name
                  </p>
                  <CustomTextField
                    value={formik.values.name}
                    onChange={(val) => formik.setFieldValue("name", val)}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginTop: 16,
                    }}
                  >
                    <CiWarning style={{ color: "black" }} />
                    <p
                      style={{
                        fontSize: 12,
                        opacity: 0.7,
                        marginLeft: 4,
                      }}
                    >
                      Topic titles are displayed publicly wherever required.
                      Each topic may contain one or more lessons, quiz and
                      assignments.
                    </p>
                  </div>
                  <p
                    style={{ fontSize: 14, fontWeight: 600 }}
                    className="pb-2 mt-10"
                  >
                    Topic Lessons
                  </p>
                  <SearchAutoCompelate
                    selected_item={formik.values.pre_lessons}
                    items={items}
                    handler={(val) => formik.setFieldValue("pre_lessons", val)}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginTop: 16,
                    }}
                  >
                    <CiWarning style={{ color: "black" }} />
                    <p
                      style={{
                        fontSize: 12,
                        opacity: 0.7,
                        marginLeft: 4,
                      }}
                    >
                      Lessons that will be added in the initial state of the
                      topic
                    </p>
                  </div>
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      margin: "16px 0px",
                      marginTop: 42,
                    }}
                  >
                    Topic Summery
                  </h3>
                  <CustomTextArea
                    value={formik.values.summery}
                    set_value={(val) => formik.setFieldValue("summery", val)}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <CiWarning style={{ color: "black" }} />
                <p
                  style={{
                    fontSize: 12,
                    opacity: 0.7,
                    marginLeft: 4,
                  }}
                >
                  Topic titles are displayed publicly wherever required. Each
                  topic may contain one or more lessons, quiz and assignments.
                </p>
              </div>
              <CustomDivider />
              <div className="flex justify-between items-center p-4">
                <BorderedButtonPrimary
                  title={"Cancel"}
                  onClick={(e) => {
                    formik.resetForm();
                    set_is_open?.(false);
                  }}
                />
                <ContainedButtonPrimary
                  title={"Add Topic"}
                  onClick={() => {
                    formik.submitForm();
                  }}
                />
              </div>
            </ModalLayout>
          </Form>
        );
      }}
    </Formik>
  );
};

type SearchAutoCompelateProps = {
  label?: string;
  items: menuType[];
  selected_item: menuType[];
  handler?: (items?: menuType[]) => void;
};

export type menuType = {
  id: string;
  label: string;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export function SearchAutoCompelate(props: SearchAutoCompelateProps) {
  // const [value, set_value] = React.useState<menuType[] | undefined>([]);

  // const selectedValues = React.useMemo(() => {
  //   let values = value?.filter((v) => v);

  //   return values;
  // }, [value]);

  // React.useEffect(() => {
  //   props.handler?.(selectedValues);

  //   // eslint-disable-next-line
  // }, [selectedValues]);

  return (
    <Autocomplete
      multiple
      popupIcon={<KeyboardArrowDown style={{}} />}
      forcePopupIcon="auto"
      renderTags={(tags, prop) => {
        return tags.map((tag, index) => (
          <Chip
            sx={{ height: "fit-content" }}
            label={tag.label}
            {...prop}
            key={index}
            onDelete={() => {
              props?.handler?.(
                props.selected_item?.filter((item) => item.id !== tag.id)
              );
            }}
          />
        ));
      }}
      options={props.items}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderOption={(prop, option, { selected }) => (
        <li {...prop}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      isOptionEqualToValue={(option, newVal) => option.id === newVal.id}
      value={props.selected_item}
      onChange={(_event: any, newVal: menuType[] | null) => {
        if (newVal !== null) {
          props?.handler?.(newVal);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant="outlined"
          size="small"
        />
      )}
    />
  );
}
