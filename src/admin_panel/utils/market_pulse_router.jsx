import Forex from '../../pages/market_pulse/forex';
import Indice from '../../pages/market_pulse/indice';
import Commodity from '../../pages/market_pulse/commodity';
import Crypto from '../../pages/market_pulse/crypto';
import Stocks from '../../pages/market_pulse/stock';
import Chart from '../../pages/market_pulse/Charting';
import Strategy from '../../pages/market_pulse/Strategy';

export const market_pulse_router = [
  {
    route: '/market-pulse/forex',
    component: <Forex />,
  },
  {
    route: '/market-pulse/commodities',
    component: <Commodity />,
  },
  {
    route: '/market-pulse/indices',
    component: <Indice />,
  },
  {
    route: '/market-pulse/crypto',
    component: <Crypto />,
  },
  {
    route: '/market-pulse/stocks',
    component: <Stocks />,
  },
  {
    route: '/market-pulse/charting',
    component: <Chart />,
  },
  {
    route: '/market-pulse/strategy',
    component: <Strategy />,
  },
];
