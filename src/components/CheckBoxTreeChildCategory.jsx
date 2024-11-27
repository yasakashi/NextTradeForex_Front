import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const TreeNode = ({ node, onSelect, selectedIds, onToggle, expandedNodes }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = expandedNodes.has(node.id);
  const isSelected = selectedIds.includes(node.id);

  return (
    <div
      className="px-3 select-none"
      style={{ marginLeft: node.parentId ? "20px" : "0" }}
    >
      <label className="flex items-center gap-2 cursor-pointer">
        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggle(node.id)}
            className="mr-2"
          >
            {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
          </button>
        ) : (
          <span className="w-4" /> // Placeholder to align tree nodes
        )}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(node)}
        />
        <span
          className={`block px-2 py-1 w-full ${
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

const CheckBoxTreeChildCategory = ({
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

    const buildFilteredTree = (nodes, filteredIds, flatData) => {
      return nodes.reduce((acc, node) => {
        const isNodeIncluded = filteredIds.has(node.id);
        const isParentExpanded = expandedNodes.has(node.id);

        // Always include parent nodes if their children match
        const filteredChildren = node.children
          ? buildFilteredTree(node.children, filteredIds, flatData)
          : [];

        if (isNodeIncluded || filteredChildren.length > 0) {
          acc.push({
            ...node,
            children: isParentExpanded ? filteredChildren : [],
          });
        }
        return acc;
      }, []);
    };

    const filteredIds = new Set(filtered.map((node) => node.id));
    const treeData = buildFilteredTree(data, filteredIds);

    // Automatically expand nodes containing the search results
    const findAllParentIds = (nodes) => {
      const parentIds = new Set();
      const visitedNodes = new Set(); // Track visited nodes to avoid cycles

      const findParent = (node) => {
        if (visitedNodes.has(node.id)) return; // Stop if the node has already been visited
        visitedNodes.add(node.id);

        if (node.parentId) {
          parentIds.add(node.parentId);
          const parentNode = flatData.find((n) => n.id === node.parentId);
          if (parentNode) findParent(parentNode); // Continue to the parent
        }
      };

      nodes.forEach(findParent);
      return parentIds;
    };

    const parentIdsToExpand = findAllParentIds(filtered);

    // Update expanded nodes only if there's a search term
    if (searchTerm) {
      setExpandedNodes(parentIdsToExpand);
    } else {
      setExpandedNodes(new Set()); // Collapse all when search term is cleared
    }

    setFilteredTreeData(treeData);
  }, [searchTerm, data]);

  const handleSearchBoxClick = (e) => {
    e.stopPropagation();
    setIsVisible(true);
  };

  const handleOutsideClick = (e) => {
    if (!categoryRef.current.contains(e.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleSelectItem = (node) => {
    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.some((cat) => cat.id === node.id);
      const newSelected = isSelected
        ? prevSelected.filter((cat) => cat.id !== node.id)
        : [...prevSelected, node];

      setCategory(
        "categoryids",
        newSelected.map((cat) => cat.id)
      );
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

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search categories..."
        onClick={handleSearchBoxClick}
        className="w-full p-2 border placeholder:text-sm border-gray-300 rounded-md mb-2 outline-none focus:ring-blue-400 focus:ring-1"
      />
      {isVisible && page === "posts" && (
        <>
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
        </>
      )}
      {/* Selected categories display */}
      <div className="mt-4">
        {selectedCategories?.length > 0 ? (
          <>
            <h3 className="font-semibold mb-2">Selected Categories:</h3>
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
          </>
        ) : (
          <p className="text-sm text-gray-500">No categories selected</p>
        )}
      </div>
    </div>
  );
};

export default CheckBoxTreeChildCategory;
