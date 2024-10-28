import { useEffect, useState } from "react";
import CustomTextField from "../../common/custom_text_field";

function FundamentalSection({ subItemName, onDataChange }) {
  const [data, setData] = useState([]);
  const [mainTitle, setMainTitle] = useState("");
  const [script, setScript] = useState("");

  // Use an array to track sub-item inputs for each main item
  const [subItems, setSubItems] = useState([{ mainTitle: "", script: "" }]);

  const addRow = () => {
    if (mainTitle && script) {
      setData([...data, { mainTitle, script, [subItemName]: [] }]);
      setMainTitle("");
      setScript("");
      // Reset the sub items for the new main item
      setSubItems((prev) => [...prev, { mainTitle: "", script: "" }]);
    }
  };

  const addSubItem = (index) => {
    const { mainTitle, script } = subItems[index];
    if (mainTitle && script) {
      const newData = [...data];
      newData[index].technicalBreakingNewslist.push({ mainTitle, script });
      setData(newData);
      // Reset sub input fields after adding
      setSubItems((prev) => {
        const newSubItems = [...prev];
        newSubItems[index] = { mainTitle: "", script: "" }; // Reset the current index
        return newSubItems;
      });

      console.log(data);
    }
  };

  const removeRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    const newSubItems = subItems.filter((_, i) => i !== index);
    setData(newData);
    setSubItems(newSubItems);
  };

  const removeSubItem = (mainIndex, subIndex) => {
    const newData = [...data];
    newData[mainIndex].technicalBreakingNewslist = newData[mainIndex].technicalBreakingNewslist.filter(
      (_, i) => i !== subIndex
    );
    setData(newData);
  };

  const handleSubInputChange = (index, field, value) => {
    const newSubItems = [...subItems];
    newSubItems[index][field] = value; // Update specific field (mainTitle or script)
    setSubItems(newSubItems);
  };

  useEffect(() => {
    onDataChange(data);
  }, [onDataChange, data]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <CustomTextField
          value={mainTitle}
          onChange={setMainTitle}
          helper_text="Main Title"
          helper_text_up_position
          placeHolder="Enter Main Title"
        />
        <CustomTextField
          value={script}
          onChange={setScript}
          helper_text="Script"
          helper_text_up_position
          placeHolder="Enter Script"
        />
      </div>

      <button className="mt-[5px] text-sm bg-blue-700 rounded-sm text-white px-[12px] py-[7px]" onClick={addRow}>
        Add Section
      </button>

      <div className="mt-4">
        {data.map((item, mainIndex) => (
          <div key={mainIndex} className="flex flex-col border-b py-2">
            <div className="flex items-center justify-between">
              <span>
                {item.mainTitle} - {item.script}
              </span>
              <button className="text-red-500 ml-4" onClick={() => removeRow(mainIndex)}>
                X
              </button>
            </div>

            {/* Sub-item inputs */}
            <div className="flex gap-2 mt-2">
              <CustomTextField
                value={subItems[mainIndex]?.mainTitle || ""}
                onChange={(val) => handleSubInputChange(mainIndex, "mainTitle", val)}
                helper_text="Sub Main Title"
                helper_text_up_position
                placeHolder="Enter Sub Main Title"
              />
              <CustomTextField
                value={subItems[mainIndex]?.script || ""}
                onChange={(val) => handleSubInputChange(mainIndex, "script", val)}
                helper_text="Sub Script"
                helper_text_up_position
                placeHolder="Enter Sub Script"
              />
              <button
                className="mt-[5px] text-sm bg-green-700 rounded-sm text-white px-[12px] py-[7px]"
                onClick={() => {
                  addSubItem(mainIndex);
                }}
              >
                Add Sub Item
              </button>
            </div>

            {/* Render technical breaking news list */}
            <div className="mt-2">
              {item.technicalBreakingNewslist.map((subItem, subIndex) => (
                <div key={subIndex} className="flex items-center justify-between border-b py-1">
                  <span>
                    {subItem.mainTitle} - {subItem.script}
                  </span>
                  <button className="text-red-500 ml-4" onClick={() => removeSubItem(mainIndex, subIndex)}>
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FundamentalSection;
