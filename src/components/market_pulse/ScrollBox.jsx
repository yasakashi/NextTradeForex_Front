import React, { useState, useRef, useEffect } from 'react';
import { createEditorState } from '../../utils/createEditorState';
import { convertFromRaw, Editor, EditorState } from 'draft-js';

export default function ReadMoreContent({ content }) {
  const [isScrollOn, setisScrollOn] = useState(false);
  const [editorState, setEditorState] = useState(() => createEditorState(content));
  const [showToggleButton, setShowToggleButton] = useState(false);
  const editorContainerRef = useRef(null);

  const toggleExpand = () => {
    setisScrollOn(!isScrollOn);
  };

  useEffect(() => {
    // Check if editor content height exceeds 200px
    if (editorContainerRef.current) {
      const editorHeight = editorContainerRef.current.clientHeight;
      setShowToggleButton(editorHeight > 200);
    }
  }, [editorState]);

  return (
    <div className="w-full text-white p-4 mx-auto">
      <div
        ref={editorContainerRef}
        className={`w-full transition-all duration-300 ${
          isScrollOn ? 'max-h-[200px] overflow-y-scroll' : 'max-h-20 overflow-hidden'
        }`}
      >
        <Editor
          editorState={editorState}
          readOnly={true}
          onChange={setEditorState}
        />
      </div>
      {showToggleButton && (
        <button
          onClick={toggleExpand}
          className="mt-2 text-gold-light_400 hover:underline focus:outline-none"
        >
          {isScrollOn ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
}
