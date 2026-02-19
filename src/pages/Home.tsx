/**
 * Home page component displaying the market overview.
 * Provides a responsive container that allows natural page scrolling.
 */
// import Card from '../components/Card';
import Card from "../components/Card";
import MarketTable from "../components/MarketTable/MarketTable";
import { homeHeaders } from "../components/MarketTable/DefaultHeaders";
import { getDashboardStocks } from "../lib/data";

const Home = () => {
  const sampleData = [
    { stock: "AAPL", price: 150, change: "+1.5%", title: 'No of Stocks' },
    { stock: "GOOGL", price: 2800, change: "-0.5%", title: 'Market Cap' },
    { stock: "AMZN", price: 3400, change: "+0.8%", title: 'Total Volume' },
  ];

  return (
    <div className="px-10 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Market Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Real-time performance of the Nigerian Stock Exchange.
        </p>
      </div>

      <div className="flex flex-row gap-6 mb-12">
        {sampleData.map((item, index) => (
          <div key={index} className="flex-1 min-w-0">
            <Card title={item.title} value={item.price} className="h-full" />
          </div>
        ))}
      </div>

      <div className="overflow-hidden">
        <MarketTable headers={homeHeaders} fetcher={getDashboardStocks} />
      </div>
    </div>
  );
};

export default Home;
