import { useEffect, useState } from "react";
import { http_instanse } from "../../axios/auth_full_http_instanse";

function CourseLevelType({ index, onLevelChange }) {
  const [isLoading, setIsLoading] = useState(true);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getLevel = async () => {
      try {
        if (isLoading) return;
        const res = await http_instanse.post("/getcourseleveltype");
        const { messageData } = res.data;
        setTypes(messageData);
        setActiveId(index);
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    };

    getLevel();
  }, [isLoading, index]);

  const [activeId, setActiveId] = useState(null);

  const handleChange = (id) => {
    setActiveId(id);
    onLevelChange(id);
  };

  return (
    <div className="rounded-sm bg-white p-[30px]">
      <h1 className="font-bold text-sm">Lesson category</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        types.map((option) => (
          <div key={option.id}>
            <label>
              <input
                type="radio"
                name="radioGroup"
                checked={activeId === option.id} // Check if this option is the active one
                onChange={() => handleChange(option.id)} // Update activeId on change
              />
              {option.name}
            </label>
          </div>
        ))
      )}
    </div>
  );
}

export default CourseLevelType;
