import React, { useState } from 'react';
import { createEditorState } from '../../utils/createEditorState';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

export default function ReadMoreContent({ content }) {
  const [isScrollOn, setisScrollOn] = useState(false);

  const toggleExpand = () => {
    setisScrollOn(!isScrollOn);
  };

  const contentState = convertFromRaw(content);
  const editorState = createEditorState(contentState);

  const htmlContent = stateToHTML(editorState.getCurrentContent());

    console.log(editorState);
    

  return (
    <div className="p-4 mx-auto">
      <div
        className={`transition-all duration-300  ${
          isScrollOn
            ? 'max-h-[200px] overflow-y-scroll'
            : 'max-h-20 overflow-hidden'
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
      </div>
      <button
        onClick={toggleExpand}
        className="mt-2 text-gold-light_400 hover:underline focus:outline-none"
      >
        {content && (isScrollOn ? 'Read Less' : 'Read More')}
      </button>
    </div>
  );
}
