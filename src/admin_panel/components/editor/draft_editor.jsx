import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const DraftEditor = ({
  editorState: value, // EditorState passed from the parent
  set_editor_value:  onChange, // Function to pass the updated state to the parent
  className = "",
  placeholder = "",
  h = "400",
}) => {
  // Handle editor state changes
  const handleEditorStateChange = (state) => {
    // Convert editor state to raw content (optional)
    const rawContentState = convertToRaw(state.getCurrentContent());

    // Extract plain text from editor state (optional)
    const plainText = rawContentState.blocks
      .map((block) => block.text)
      .join(" ");

    // Call the onChange function with the new editor state and extracted values
    onChange?.({ state, rawContent: rawContentState, plainText });
  };

  return (
    <div
      className={`w-full bg-white text-gray-700 rounded-[8px] p-2 h-[${h}px] ${className}`}
    >
      <Editor
        editorState={value} // Use the editor state from the parent
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorStyle={{ height: "100%", padding: 4 }}
        spellCheck
        toolbar={{}} // Customize the toolbar here
        placeholder={placeholder}
        onEditorStateChange={handleEditorStateChange} // Handle editor state change
      />
    </div>
  );
};

export default DraftEditor;
