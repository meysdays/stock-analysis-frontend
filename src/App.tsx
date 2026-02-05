import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
// import {faker} from '@faker-js/faker'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import type { ChartData } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

// interface Stock {
//   date: string;
//   open: string;
//   high: string;
//   low: string;
//   close: string;
//   volume: string;
//   stock_name: string;
//   id: number;
// }

interface StockApiData {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  stock_name: string;
}

interface stockName {
  stock_name: string;
}

// interface userResponse {
//   customer: User[];
// }

const App = () => {
  const [stocks, setstocks] = useState<stockName[]>([]);
  const [allStocks, setAllStocks] = useState<StockApiData[]>([]);
  const [stockName, setStockName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:8000/stocks/stocks_name");
      if (!response.ok) {
        throw new Error("Failed to fetch stocks");
      }
      const data: stockName[] = await response.json();
      setstocks(data);
      console.log(data);
      setLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
        // throw new Error(e?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async (name: string): Promise<void> => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/stocks/name/${encodeURIComponent(name)}`,
      );
      // console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch stocks");
      }
      const data: StockApiData[] = await response.json();
      setAllStocks(data);
      console.log(data);

      setLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
        // throw new Error(e?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const sortedStocks = [...allStocks].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const monthlyData: StockApiData[] = Object.values(
    sortedStocks.reduce(
      (acc, item) => {
        const month = new Date(item.date).toISOString().slice(0, 7); // YYYY-MM

        acc[month] = item; // keep last trading day of the month
        return acc;
      },
      {} as Record<string, StockApiData>,
    ),
  );

  const labels = monthlyData.map((item) =>
    new Date(item.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    }),
  );

  const closePrices = monthlyData.map((item) => Number(item.close));

  const handleClick = (name: string) => {
    console.log(name);
    setStockName(name);
    fetchAllData(name);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //      label: 'Dataset 1',
  //     data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
  //     borderColor: 'rgb(255, 99, 132)',
  //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     // label: stockName,
  //     // data: allStocks.map((item) => item.close),
  //     // borderColor: 'rgb(255, 99, 132)',
  //     // backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //   },
  //   ]
  // }

  const data: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: stockName,
        data: closePrices,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 12, // show ~12 labels max
        },
      },
    },
  };

  return (
    <div className=" bg-[#FFF7E8]">
      <div className=" w-[98%] p-12 m-auto flex flex-row justify-between">
        <div className="w-1/4 rounded-2xl bg-white p-12 h-screen overflow-y-auto scrollbar-non">
          {stocks.map((stock, index) => (
            <ul key={index}>
              <li
                onClick={() => {
                  handleClick(stock.stock_name);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-[#FFF7E8] rounded-2xl"
              >
                {stock.stock_name}
              </li>
            </ul>
          ))}
        </div>
        <div className="w-2/3 rounded-2xl bg-white p-12">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default App;
