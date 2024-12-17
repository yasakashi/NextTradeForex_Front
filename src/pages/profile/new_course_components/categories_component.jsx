import React, { useId, useState, useEffect, useRef } from "react";
import NewCourceCard from "./new_cource_card";
import { AnimatePresence, motion } from "framer-motion";
import BootstrapTabs from "../../../common/bootstrap_tabs";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useGetCategoriesMutation } from "../../../redux/features/categories/categoriesApi";
import toast from "react-hot-toast";

const CategoriesComponent = ({ categoryids = [], onChange, errorMsg }) => {
  const [current_tab, set_current_tab] = useState("Categories");
  const [selectedCategories, setSelectedCategories] = useState(categoryids);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [filteredTreeData, setFilteredTreeData] = useState([]);
  const categoryRef = useRef(null);

  const [getCategories, { data, error, isLoading: getCategoriesLoading }] =
    useGetCategoriesMutation();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedData = await getCategories().unwrap();
        setFilteredTreeData(fetchedData || []);
      } catch (err) {
        toast.error("Failed to fetch categories");
      }
    }
    fetchCategories();
  }, [getCategories]);

  useEffect(() => {
    if (categoryids?.length > 0) setSelectedCategories(categoryids); // Sync with prop changes
  }, [categoryids]);

  const handleSelectItem = (node) => {
    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.includes(node.id);
      const newSelected = isSelected
        ? prevSelected.filter((id) => id !== node.id)
        : [...prevSelected, node.id];

      if (onChange) {
        onChange(newSelected); // Notify parent about updated selection
      }
      return newSelected;
    });
  };

  const handleToggleNode = (id) => {
    setExpandedNodes((prev) => {
      const newExpandedNodes = new Set(prev);
      if (newExpandedNodes.has(id)) {
        newExpandedNodes.delete(id);
      } else {
        newExpandedNodes.add(id);
      }
      return newExpandedNodes;
    });
  };

  const handleSearchBoxClick = (e) => {
    e.stopPropagation();
  };

  return (
    <NewCourceCard title="Categories">
      <div
        style={{ width: "100%", flexDirection: "column", padding: "8px 16px" }}
        className="flex"
      >
        <div style={{ width: "100%" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories..."
            onClick={handleSearchBoxClick}
            className="w-full p-2 border placeholder:text-sm border-gray-300 rounded-md mb-2 outline-none focus:ring-blue-400 focus:ring-1"
          />
        </div>

        <div className="bg-gray-200 overflow-x-hidden overflow-y-scroll w-full border border-[#000] flex flex-wrap overflow-auto min-h-[150px] mt-2 rounded-[4px] max-h-[200px] scrollbar-thin">
          <ul className="list-disc pl-5 flex items-center gap-2 flex-wrap">
            {selectedCategories?.map((categoryId) => {
              const category = data?.find((cat) => cat.id === categoryId);
              return (
                category && (
                  <li
                    key={categoryId}
                    className="flex items-center mb-1 bg-slate-100 px-2 py-1 rounded-[25px] w-max shadow-sm"
                  >
                    {category.name}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => handleSelectItem({ id: categoryId })}
                    >
                      <MdClose size={12} className="text-red-700" />
                    </button>
                  </li>
                )
              );
            })}
          </ul>
        </div>

        {errorMsg ? (
          <div className="p-2 text-sm text-red-600">{errorMsg}</div>
        ) : null}

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
          <ul
            ref={categoryRef}
            className={`list-none w-full h-full p-0 rounded-sm py-4 px-2`}
          >
            {filteredTreeData?.length > 0 ? (
              filteredTreeData?.map((node) => (
                <TreeNode
                  key={node.id}
                  node={node}
                  onSelect={handleSelectItem}
                  selectedIds={selectedCategories}
                  onToggle={handleToggleNode}
                  expandedNodes={expandedNodes}
                />
              ))
            ) : getCategoriesLoading ? (
              <span className="p-4 text-gray-700 text-sm">Loading ...</span>
            ) : (
              <li className="text-gray-700 text-sm p-4">
                Categories not found.
              </li>
            )}
          </ul>
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

const TreeNode = ({ node, onSelect, selectedIds, onToggle, expandedNodes }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = expandedNodes.has(node.id);

  const isSelected = selectedIds.includes(node.id);

  return (
    <div
      className="px-3 select-none"
      style={{ marginLeft: node.parentId ? "20px" : "0" }}
    >
      <label className="flex items-center gap-2">
        {hasChildren ? (
          <button
            type="button"
            onClick={() => {
              onToggle(node.id);
            }}
            className="mr-2 text-blue-accent text-sm cursor-pointer flex items-center"
          >
            [{isOpen ? <FaMinus size={8} /> : <FaPlus size={8} />}]
          </button>
        ) : (
          <span className="w-4" /> // Placeholder to align tree nodes
        )}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(node)}
          className="cursor-pointer"
        />
        <span
          className={`block px-2 py-1 w-full cursor-pointer ${
            isSelected ? "font-bold text-gray-800" : "text-gray-600"
          }`}
        >
          {node.name}
        </span>
      </label>

      {isOpen && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              selectedIds={selectedIds}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      )}
    </div>
  );
};
