import React, { useState } from 'react';
import { createEditorState } from '../../utils/createEditorState';
import { stateToHTML } from 'draft-js-export-html';

export default function ReadMoreContent({ content }) {
  const [isScrollOn, setisScrollOn] = useState(false);

  const toggleExpand = () => {
    setisScrollOn(!isScrollOn);
  };
  const editorState = createEditorState(content)
  const htmlContent = stateToHTML(editorState.getCurrentContent());

  const isHtmlContentEmpty = (htmlString) => {
    const cleaned = htmlString.replace(/<(\w+)[^>]*>(\s|<br\s*\/?>)*<\/\1>/g, '').trim();
    return cleaned.length === 0;
  }

  return (
    <div className="p-4 mx-auto">
      <div
        className={`transition-all duration-300  ${
          isScrollOn
            ? 'max-h-[200px] overflow-y-scroll'
            : 'max-h-20 overflow-hidden'
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
      <button
        onClick={toggleExpand}
        className="mt-2 text-gold-light_400 hover:underline focus:outline-none"
      >
        {!isHtmlContentEmpty(htmlContent) && (isScrollOn ? 'Read Less' : 'Read More')}
      </button>
    </div>
  );
}
