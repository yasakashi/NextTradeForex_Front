import React, { useId, useState, useEffect } from "react";
import NewCourceCard from "./new_cource_card";
import CustomTextField from "../../../common/custom_text_field";
import { AnimatePresence, motion } from "framer-motion";
import useCategories from "../../../admin_panel/pages/categories/hook/use_categories";
// import { CustomSelectBox } from "./custom_select_box";
import BootstrapTabs from "../../../common/bootstrap_tabs";

const CategoriesComponent = ({ set_category_type_id, category_id }) => {
  const [search_text, set_search_text] = useState("");
  const [current_tab, set_current_tab] = useState("Categories");
  const { categories } = useCategories({ make_id_tree: true });
  const [selected_categories, set_selected_categories] = useState({});

  useEffect(() => {
    if (category_id) {
      let cat = categories.find(
        (item) =>
          item.id === category_id ||
          item.childs?.some((child) => child.id === category_id)
      );

      set_selected_categories({ id: cat?.id, name: cat?.name });
    }
  }, [category_id, categories]);

  useEffect(() => {
    if (!selected_categories?.id) return;
    set_category_type_id?.(selected_categories.id);
  }, [selected_categories, set_category_type_id]);

  return (
    <NewCourceCard title="Categories">
      <div
        style={{ width: "100%", flexDirection: "column", padding: "8px 16px" }}
        className="flex"
      >
        <div style={{ width: "100%" }}>
          <CustomTextField
            value={search_text}
            onChange={(val) => set_search_text(val || "")}
            placeHolder={"Search Categories"}
            type={"text"}
            style={{ height: 40 }}
          />
        </div>
        <div
          className="bg-gray-200"
          style={{
            width: "100%",
            border: "1px solid #000",
            display: "flex",
            flexWrap: "wrap",
            overflow: "auto",
            minHeight: 150,
            marginTop: 8,
            borderRadius: 4,
            maxHeight: 200,
          }}
        >
          <p className="text-base font-semibold">{selected_categories.name}</p>
        </div>
        <BootstrapTabs
          disable_padding
          items={[{ title: "Categories" }, { title: "Most Used" }]}
          current_tab={current_tab}
          onClick={(e) => set_current_tab(e)}
        />
        <div
          style={{
            border: "1px solid #999",
            width: "100%",
            minHeight: 120,
            maxHeight: 400,
            padding: 8,
            overflow: "auto",
          }}
        >
          {current_tab === "Categories" &&
            categories
              .filter((item) => item.name.indexOf(search_text) > -1)
              ?.map((item, i) => {
                return (
                  <Row
                    key={i}
                    id={item.id}
                    name={item.name}
                    childs={item?.childs}
                    checked={(id) => selected_categories.id === id}
                    onChange={({ id, name }) => {
                      set_selected_categories({ id, name });
                    }}
                  />
                );
              })}
        </div>
      </div>
    </NewCourceCard>
  );
};

export default CategoriesComponent;

export const Row = ({ checked, id, onChange, name, childs }) => {
  const [open_childs, set_open_childs] = useState(false);
  const key = useId();
  let check = checked(id);
  return (
    <div className="w-full ">
      <div className="bg-white mb-1">
        <input
          checked={check}
          className="w-4 h-4 border border-blue-300 rounded bg-blue-50 focus:ring-3 focus:ring-blue-600 dark:bg-blue-700 dark:border-blue-600 dark:focus:ring-blue-600 dark:ring-offset-blue-800"
          type="checkbox"
          id={`${id}`}
          name={`${id}`}
          onChange={() => {
            if (!childs) return onChange({ name, id });
            set_open_childs((pre) => !pre);
          }}
        />
        <label
          htmlFor={`${id}`}
          style={{ marginRight: 24, marginLeft: 4, fontSize: 13 }}
        >
          {name}
        </label>
      </div>
      <AnimatePresence mode="sync">
        {open_childs && (
          <motion.div
            key={`${key} ${open_childs}`}
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            animate={{ height: "fit-content" }}
            className="bg-white pl-6"
            style={{ overflowY: "hidden" }}
          >
            {childs?.map((child, index) => {
              return (
                <Row
                  key={index}
                  checked={() => checked(child.id)}
                  id={child.id}
                  childs={child.childs}
                  name={child.name}
                  onChange={({}) => {
                    onChange({ id: child.id, name: child.name });
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
