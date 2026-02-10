/**
 * Home page component displaying the market overview.
 * Provides a responsive container that allows natural page scrolling.
 */
import MarketTable from '../components/MarketTable';

const Home = () => {
  // Main container allows vertical scrolling with the page naturally
  return (
    <div className="p-6">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-6">Market Overview</h1>
      {/* Market table component with stock data */}
      <MarketTable />
    </div>
  );
};

export default Home;