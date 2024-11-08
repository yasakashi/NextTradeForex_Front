import React, { useEffect } from 'react';

const TechnicalAnalysisWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.async = true;

    script.innerHTML = JSON.stringify({
      interval: '1m',
      width: 425,
      isTransparent: false,
      height: 450,
      symbol: 'NASDAQ:AAPL',
      showIntervalTabs: true,
      displayMode: 'single',
      locale: 'en',
      colorTheme: 'dark',
    });

    const container = document.getElementById(
      'tradingview-technical-analysis-widget-container'
    );
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) container.removeChild(script);
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      id="tradingview-technical-analysis-widget-container"
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

export default TechnicalAnalysisWidget;
