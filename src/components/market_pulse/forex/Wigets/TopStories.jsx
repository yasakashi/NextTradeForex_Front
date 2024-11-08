import React, { useEffect } from 'react';

const TradingViewTimelineWidget = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.async = true;
    
    // Add the JSON configuration directly in the script's innerHTML
    script.innerHTML = JSON.stringify({
      "feedMode": "all_symbols",
      "isTransparent": false,
      "displayMode": "regular",
      "width": 400,
      "height": 550,
      "colorTheme": "dark",
      "locale": "en"
    });

    // Append the script to the div where we want to load the widget
    const container = document.getElementById("tradingview-timeline-widget-container");
    if (container) {
      container.appendChild(script);
    }
    
    // Cleanup script on component unmount
    return () => {
      container.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container" id="tradingview-timeline-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewTimelineWidget;