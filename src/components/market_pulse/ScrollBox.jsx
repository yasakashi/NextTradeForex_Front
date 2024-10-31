import React, { useState } from 'react';

export default function ReadMoreContent() {
  const [isScrollOn, setisScrollOn] = useState(false);

  const toggleExpand = () => {
    setisScrollOn(!isScrollOn);
  };

  return (
    <div className='p-4 mx-auto'>
      <div
        className={`transition-all duration-300  ${
          isScrollOn
            ? 'max-h-[200px] overflow-y-scroll'
            : 'max-h-20 overflow-hidden'
        }`}
      >
        <p className='text-link-water opacity-50'>
          The EUR/USD is the pairing of the euro and the United States dollar.
          The EUR/USD is the most traded currency pairin the world, accounting
          for nearly 30% of the total daily volume in FX. This sheer volume
          makes it incredibly liquid. EUR/USD is highly sensitive to fundamental
          news announcements released by the U.S., and due to its
          popularity,traders can access a wealth of analytical information. If
          you are new to trading forex, then understanding the basics of major
          currency pairs is crucial. One such pair that holds significant
          importance is the EURUSD, which symbolizes the exchange rate between
          the euro and the U.S. dollar. In this guide, we will walk you through
          the essential factors that impact the EURUSD pair and how you can
          leverage them for successful trades. Factors Influencing EURUSD
          Economic Indicators: The performance of both economies affects the
          value of the EURUSD. Hence, traders pay attention to macroeconomic
          indicators like employment rates, inflation, interest rates, and GDP
          growth rates to gauge their impact on the exchange rate. Political
          Events: Political events like elections, referendums, and trade
          agreements also impact the EURUSD rate. For instance, if there is
          political instability or uncertainty in either economy, it can cause a
          decline in the exchange rate. Market Sentiment: The market sentiment
          towards either currency can influence the EURUSD rate. If investors
          have positive sentiments over the Eurozone’s economic stability, they
          tend to buy the euro, resulting in an increase in the exchange rate.
          Similarly, if investors think the U.S. dollar is stronger, they may
          sell euros, decreasing the exchange rate. Trading Strategies Technical
          Analysis: Traders use technical analysis to analyze historical price
          trends and chart patterns to predict future price movements. This
          approach involves using different charting tools and technical
          indicators like moving averages, RSI, and MACD, among others.
          Fundamental Analysis: This approach involves analyzing economic and
          political events to make informed decisions on trading positions. For
          instance, if there is positive news about the U.S. economy, traders
          may decide to go long on the USD, while if there is negative news
          about the Eurozone’s economic stability, they may short the EUR.
          Conclusion Trading the EURUSD pair can be rewarding and profitable as
          long as traders understand the critical factors that impact its
          exchange rate. Using both technical and fundamental analysis, you can
          make informed trading decisions and minimize risks. Ensure to keep a
          close eye on the market trends and adjust your trades accordingly to
          maximize profits.
        </p>
      </div>
      <button
        onClick={toggleExpand}
        className='mt-2 text-gold-light_400 hover:underline focus:outline-none'
      >
        {isScrollOn ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
}
