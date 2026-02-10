/**
 * Home page component displaying the market overview.
 * Provides a responsive container that allows natural page scrolling.
 */
import MarketTable from '../components/MarketTable';

const Home = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Market Overview</h1>
      <MarketTable />
    </div>
  );
};

export default Home;