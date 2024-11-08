import React from 'react';

const FXPricingLastCandleWidget = () => {
  return (
    <div className="flex flex-col items-center mt-4">
      <iframe
        src="https://fxpricing.com/fx-widget/last-candle-widget.php?id=1,2,3,5,14,20"
        width="100%"
        height="318"
        className="border border-gray-200 rounded-md"
        title="FX Pricing Last Candle Widget"
      ></iframe>

      <div className="text-center text-sm font-sans mt-3 mb-3 text-gray-400">
        <span>Powered by </span>
        <a
          href="https://fxpricing.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 font-semibold hover:text-red-700"
        >
          FX Pricing
        </a>
      </div>
    </div>
  );
};

export default FXPricingLastCandleWidget;
