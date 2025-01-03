import Forex from '../../pages/market_pulse/forex';
import Indice from '../../pages/market_pulse/indice';
import Commodity from '../../pages/market_pulse/Commodity';
import Crypto from '../../pages/market_pulse/Crypto';
import Stocks from '../../pages/market_pulse/stock';

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
    component: <Forex />,
  },
  {
    route: '/market-pulse/strategy',
    component: <Forex />,
  },
];
