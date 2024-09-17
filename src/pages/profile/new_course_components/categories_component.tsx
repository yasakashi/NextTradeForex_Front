import React, { useId } from "react";
import NewCourceCard from "./new_cource_card";
import CustomTextField from "../../../common/custom_text_field";
import { AnimatePresence, motion } from "framer-motion";
import useCategories, {
  CategoryModel,
} from "../../../admin_panel/pages/categories/hook/use_categories";
// import { CustomSelectBox } from "./custom_select_box";
import BootstrapTabs from "../../../common/bootstrap_tabs";
const CategoriesComponent = ({
  set_category_type_id,
  category_id,
}: {
  set_category_type_id?: (id: any) => void;
  category_id?: string | number;
}) => {
  const [search_text, set_search_text] = React.useState("");
  const [current_tab, set_current_tab] = React.useState("Categories");
  const { categories } = useCategories({ make_id_tree: true });
  const [selected_categories, set_selected_categories] = React.useState<{
    id?: number;
    name?: string;
  }>({});
  React.useEffect(() => {
    if (category_id) {
      let cat = categories.find(
        (item) =>
          item.id === category_id ||
          item.childs?.some((child) => child.id === category_id)
      );

      set_selected_categories({ id: cat?.id, name: cat?.name });
    }
  }, []);

  React.useEffect(() => {
    if (!selected_categories?.id) return;
    set_category_type_id?.(selected_categories.id);
  }, [selected_categories]);
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
          {/* {selected_categories.map((item, i) => {
            return (
              <p key={i} className="text-base font-semibold">
                {item.name} {i !== selected_categories.length - 1 ? " ," : ""}{" "}
              </p>
            );
          })} */}
        </div>
        <BootstrapTabs
          disable_padding
          items={[{ title: "Categories" }, { title: "Most Used" }]}
          current_tab={current_tab}
          onClick={(e) => {
            set_current_tab(e);
          }}
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
                    // checked={(id) => selected_categories.some((s) => s.id === id)}
                    onChange={({ id, name }) => {
                      set_selected_categories({ id, name });
                      // set_selected_categories((pre) => {
                      //   if (pre.length === 0) return [{ id, name }];
                      //   if (pre.some((pe) => pe.id === id))
                      //     return pre.filter((d) => d.id !== id);
                      //   return [...pre, { id, name }];
                      // });
                    }}
                  />
                );
              })}
        </div>
      </div>
    </NewCourceCard>
  );
};
// selected_categories.some((s) => s === item?.name)
export default CategoriesComponent;
export const Row = ({
  checked,
  id,
  onChange,
  name,
  childs,
}: {
  checked: (id: number) => boolean;
  id: number;
  name: string;
  childs?: CategoryModel[];
  onChange: ({ id, name }: { id: number; name: string }) => void;
}) => {
  const [open_childs, set_open_childs] = React.useState(false);
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
          onChange={(e) => {
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
