import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

// Component to display a single tree node with collapsible functionality
const TreeNode = ({ node, onSelect, selectedIds, onToggle, expandedNodes }) => {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;
  const isOpen = expandedNodes.has(node.id);
  const isSelected = selectedIds.includes(node.id);

  return (
    <div
      className={`px-3 select-none ${node.parentId ? "" : ""}`}
      style={{ marginLeft: node.parentId ? "20px" : "0" }}
    >
      {hasChildren && (
        <button
          type="button"
          onClick={() => onToggle(node.id)}
          style={{ marginRight: "5px" }}
        >
          {isOpen ? (
            <FaMinus className="text-gray-700" size={12} />
          ) : (
            <FaPlus className="text-gray-700" size={12} />
          )}
        </button>
      )}
      <span
        style={{
          cursor: hasChildren ? "default" : "pointer",
          fontWeight: isSelected ? "bold" : "normal",
        }}
        className={`${
          hasChildren
            ? "text-gray-800"
            : "text-gray-600 hover:bg-slate-100 rounded-sm px-2 py-[2px] w-full block my-1"
        }`}
        onClick={(e) => {
          e.preventDefault();
          if (!hasChildren) {
            onSelect(node); // Allow selection only if there are no children
          }
        }}
      >
        {node.name}
      </span>
      {isOpen && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              selectedIds={selectedIds}
              onToggle={onToggle}
              expandedNodes={expandedNodes} // Pass expandedNodes to child nodes
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main searchable tree component
const MultiChildrenCategories = ({
  data,
  page,
  loading,
  setCategory,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [filteredTreeData, setFilteredTreeData] = useState(data);
  const categoryRef = useRef(null);

  const flattenData = (nodes) => {
    let result = [];
    const recurse = (nodes) => {
      nodes.forEach((node) => {
        result.push(node);
        if (node.children) {
          recurse(node.children);
        }
      });
    };
    recurse(nodes);
    return result;
  };

  useEffect(() => {
    const flatData = flattenData(data);

    const filtered = flatData.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const buildFilteredTree = (nodes, filteredIds) => {
      return nodes.reduce((acc, node) => {
        if (filteredIds.has(node.id)) {
          acc.push({
            ...node,
            children: node.children
              ? buildFilteredTree(node.children, filteredIds)
              : [],
          });
        } else if (node.children) {
          const filteredChildren = buildFilteredTree(
            node.children,
            filteredIds
          );
          if (filteredChildren.length > 0) {
            acc.push({
              ...node,
              children: filteredChildren,
            });
          }
        }
        return acc;
      }, []);
    };

    const filteredIds = new Set(filtered.map((node) => node.id));
    const treeData = buildFilteredTree(data, filteredIds);

    const findAllParentIds = (nodes) => {
      const parentIds = new Set();
      const visited = new Set(); // Track visited nodes to prevent circular references

      const findParent = (node, depth = 0) => {
        if (depth > 100 || visited.has(node.id)) return; // Limit recursion depth and prevent revisiting nodes

        visited.add(node.id);
        if (node.parentId) {
          parentIds.add(node.parentId);
          const parentNode = flatData.find((n) => n.id === node.parentId);
          if (parentNode) findParent(parentNode, depth + 1); // Increase depth with each recursive call
        }
      };

      nodes.forEach(findParent);
      return parentIds;
    };

    const parentIdsToExpand = findAllParentIds(filtered);

    if (searchTerm) {
      setExpandedNodes(parentIdsToExpand);
    } else {
      setExpandedNodes(new Set());
    }

    setFilteredTreeData(treeData);
  }, [searchTerm, data]);

  const handleSearchBoxClick = () => setIsVisible((prev) => !prev);

  const handleSelectItem = (node) => {
    if (!Array.isArray(node.children) || node.children.length === 0) {
      setSelectedCategories((prevSelectedCategories) => {
        let newSelectedCategories;
        if (prevSelectedCategories.some((cat) => cat.id === node.id)) {
          newSelectedCategories = prevSelectedCategories.filter(
            (cat) => cat.id !== node.id
          );
        } else {
          newSelectedCategories = [...prevSelectedCategories, node];
        }
        setCategory(
          "categoryids",
          newSelectedCategories?.map((cat) => cat.id)
        );
        return newSelectedCategories;
      });
    }
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        if (event.target.tagName !== "INPUT") {
          setIsVisible(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search categories..."
        onClick={handleSearchBoxClick}
        className="w-full p-2 border placeholder:text-sm border-gray-300 rounded-md mb-2 outline-none focus:ring-blue-400 focus:ring-1"
      />
      {isVisible && page === "posts" && (
        <ul
          ref={categoryRef}
          className={`list-none scrollbar-thin overflow-y-scroll w-full p-0 ${
            page === "admin"
              ? "max-h-[80vh]"
              : "h-[30vh] border border-gray-300 rounded-sm py-4 px-2"
          }`}
        >
          {filteredTreeData?.length > 0 ? (
            filteredTreeData?.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                onSelect={handleSelectItem}
                selectedIds={selectedCategories.map((cat) => cat.id)}
                onToggle={handleToggleNode}
                expandedNodes={expandedNodes}
              />
            ))
          ) : (
            <li>No categories found</li>
          )}
        </ul>
      )}
      {/* Selected categories display */}
      <div className="mt-4">
        {selectedCategories?.length > 0 ? (
          <h3 className="font-semibold mb-2">Selected Categories:</h3>
        ) : null}
        <ul className="list-disc pl-5 flex items-center gap-2 flex-wrap">
          {selectedCategories?.map((category) => (
            <li
              key={category.id}
              className="flex items-center mb-1 bg-slate-100 px-2 py-1 rounded-[25px] w-max shadow-sm"
            >
              {category.name}
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() =>
                  setSelectedCategories((prev) =>
                    prev.filter((cat) => cat.id !== category.id)
                  )
                }
              >
                <MdClose size={12} className="text-red-700" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiChildrenCategories;
