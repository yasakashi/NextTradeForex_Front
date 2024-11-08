import React, { useEffect } from 'react';

const CalenderWidget = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.async = true;

    // Add the JSON configuration directly in the script's innerHTML
    script.innerHTML = JSON.stringify({
      colorTheme: 'light',
      isTransparent: false,
      width: '400',
      height: '550',
      locale: 'en',
      importanceFilter: '-1,0,1',
      countryFilter:
        'ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu',
    });

    // Append the script to the div where we want to load the widget
    const container = document.getElementById('tradingview-widget-container');
    if (container) {
      container.appendChild(script);
    }

    // Cleanup script on component unmount
    return () => {
      container.removeChild(script);
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      id="tradingview-widget-container"
    >
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

export default CalenderWidget;
