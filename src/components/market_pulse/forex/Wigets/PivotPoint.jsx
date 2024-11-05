import React from 'react';

const FXPricingPivotPointWidget = ({
  src = 'https://fxpricing.com/fx-widget/pivot-point-widget.php?id=1',
  width = '100%',
  height = '457',
}) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <div
        className="border border-gray-200 rounded-md"
        style={{
          width: width,
          height: height,
        }}
      >
        <iframe
          src={src}
          width="100%"
          height="100%"
          className="border-0"
          title="FX Pricing Pivot Point Widget"
        ></iframe>
      </div>

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

export default FXPricingPivotPointWidget;
