import React, { useState, useEffect } from 'react';

const TechnicalTab = ({ script }) => {
  const containerRef = React.useRef(null);
  

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if the script is an iframe
    if (script.includes('<iframe')) {
      // For iframe, directly append to container without parsing
      containerRef.current.innerHTML = script;
    } else {
      // Otherwise, process the widget script like TradingView widget
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = script;

      // Extract the <script> element (if it exists)
      const scriptElement = tempContainer.querySelector('script');

      // Set the inner HTML of the container without the script tag
      containerRef.current.innerHTML = tempContainer.innerHTML.replace(
        scriptElement?.outerHTML,
        ''
      );

      // Create a new script element to execute
      const newScript = document.createElement('script');
      if (scriptElement) {
        Array.from(scriptElement.attributes).forEach((attr) =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.innerHTML = scriptElement.innerHTML;

        // Append the new script element to the container
        containerRef.current.appendChild(newScript);
      }
    }
  }, [script]);

  return <div ref={containerRef} />;
};

const CommonDashboardTable = ({ tabs }) => {


  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const activeTabData = tabs.find((tab) => tab?.id === activeTab);

  return (
    <div className="bg-blue-dark border-[1px] border-gold-light_400 text-white p-4">
      <div className="flex space-x-4 mb-6">
        {tabs &&
          tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-bold py-2 px-4 ${
                activeTab === tab.id
                  ? 'bg-gold-light_400 rounded-t-lg'
                  : 'border-b border-gold-light_400'
              }`}
            >
              {tab.maintitle}
            </button>
          ))}
      </div>

      <div className="flex gap-3">
        <div className="flex-1 grid grid-cols-3 gap-4 bg-blue-light p-4 rounded-r-lg">
          {activeTabData?.script && (
            <TechnicalTab script={activeTabData.script} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonDashboardTable;
