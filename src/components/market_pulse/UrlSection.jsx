import { useEffect, useState } from "react";
import CustomTextField from "../../common/custom_text_field";

function UrlSection({ urlData, onDataChange }) {
  const [data, setData] = useState(urlData || []);

  const [url, setUrl] = useState("");
  const [urlTitle, setUrlTitle] = useState("");

  const addRow = () => {
    if (url && urlTitle) {
      setData([...data, { url, urlTitle }]);
      // Reset input fields after adding a row
      setUrl("");
      setUrlTitle("");
    }
  };

  const removeRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  useEffect(() => {
    onDataChange(data);
  }, [onDataChange, data]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <CustomTextField
          value={url}
          onChange={setUrl}
          helper_text="URL"
          helper_text_up_position
          placeHolder="Enter URL"
        />
        <CustomTextField
          value={urlTitle}
          onChange={setUrlTitle}
          helper_text="URL TITLE"
          helper_text_up_position
          placeHolder="Enter URL Title"
        />
      </div>

      <button className="mt-[5px] text-sm bg-blue-700 rounded-sm text-white px-[12px] py-[7px]" onClick={addRow}>
        Add URL
      </button>

      <div className="mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b py-2">
            <span>
              {item.url} - {item.urlTitle}
            </span>
            <button className="text-red-500 ml-4" onClick={() => removeRow(index)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UrlSection;
