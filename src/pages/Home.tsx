/**
 * Home page component displaying the market overview.
 * Provides a responsive container that allows natural page scrolling.
 */
// import Card from '../components/Card';
import Card from "../components/Card";
import MarketTable from "../components/MarketTable/MarketTable";
import { homeHeaders } from "../components/MarketTable/DefaultHeaders";
import { getDashboardStocks } from "../lib/data";

import MeterCard from "../components/MeterCard";
import ChatModalV2 from "../components/ChatModalV2";
import { useState } from "react";

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const sampleData = [
    { stock: "AAPL", price: 150, change: "+1.5%", title: 'No of Stocks' },
    { stock: "GOOGL", price: 2800, change: "-0.5%", title: 'Market Cap' },
  ];

  return (
    <div className="px-10 py-14">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary tracking-tight">
          Market Overview
        </h1>
        <p className="text-secondary text-sm mt-1">
          Real-time performance of the Nigerian Stock Exchange.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {sampleData.map((item, index) => (
          <div key={index} className="min-w-0">
            <Card title={item.title} value={`$${item.price}B`} className="h-[140px]" />
          </div>
        ))}

        {/* RSI Meter based on Average Crypto RSI from reference */}
        <MeterCard
          title="Average Market RSI"
          value={<>45.75</>}
          min={0}
          max={100}
          current={45.75}
          leftLabel="Oversold"
          rightLabel="Overbought"
          className="h-[140px]"
          segments={[
            { color: '#16c784', widthPercent: 16.67 },
            { color: '#0f8b5c', widthPercent: 16.67 },
            { color: '#2a2e39', widthPercent: 16.67 }, // neutral / background
            { color: '#2a2e39', widthPercent: 16.67 }, // neutral / background
            { color: '#a4282f', widthPercent: 16.67 },
            { color: '#ea3943', widthPercent: 16.67 },
          ]}
        />

        {/* MACD / Momentum Meter */}
        <MeterCard
          title="Market MACD Momentum"
          value={<>+1.20</>}
          min={-5}
          max={5}
          current={1.20}
          leftLabel="Bearish"
          rightLabel="Bullish"
          className="h-[140px]"
          segments={[
            { color: '#ea3943', widthPercent: 50 }, // negative half
            { color: '#16c784', widthPercent: 50 }, // positive half
          ]}
        />
      </div>

      <div className="overflow-hidden">
        <MarketTable headers={homeHeaders} fetcher={getDashboardStocks} />
      </div>

      <button
                  className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center text-2xl focus:outline-none focus:ring"
                  onClick={() => setChatOpen(true)}
                  title="Ask Stock AI"
                >
                  <span className="material-symbols-outlined">chat</span>
                </button>

                {/* Chat Modal */}
                <ChatModalV2 open={chatOpen} onClose={() => setChatOpen(false)}  />
    </div>
  );
};

export default Home;
