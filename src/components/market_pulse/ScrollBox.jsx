import React, { useState } from 'react';

export default function ReadMoreContent({ content }) {
  const [isScrollOn, setisScrollOn] = useState(false);

  const toggleExpand = () => {
    setisScrollOn(!isScrollOn);
  };

  return (
    <div className="p-4 mx-auto">
      <div
        className={`transition-all duration-300  ${
          isScrollOn
            ? 'max-h-[200px] overflow-y-scroll'
            : 'max-h-20 overflow-hidden'
        }`}
      >
        <p className="text-link-water opacity-50">{content}</p>
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
