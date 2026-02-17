/**
 * Home page component displaying the market overview.
 * Provides a responsive container that allows natural page scrolling.
 */
// import Card from '../components/Card';
import Card from "../components/Card";
import MarketTable from "../components/MarketTable/MarketTable";

const Home = () => {
  const sampleData = [
    { stock: "AAPL", price: 150, change: "+1.5%", title: 'No of Stocks' },
    { stock: "GOOGL", price: 2800, change: "-0.5%", title: 'Market Cap' },
    { stock: "AMZN", price: 3400, change: "+0.8%", title: 'Total Volume' },
  ];

  return (
    <div className="px-10 py-8">
      <h1 className="text-2xl font-bold mb-8 text-slate-900">
        Market Overview
      </h1>
      <div className="flex flex-row gap-8 mb-12">
        {sampleData.map((item, index) => (
          <div key={index} className="w-full">
            <Card title={item.title} value={item.price} />
          </div>
        ))}
      </div>
      <MarketTable />
    </div>
  );
};

export default Home;
