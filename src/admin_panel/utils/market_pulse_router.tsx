import Forex from '../../pages/market_pulse/forex';
import Indice from '../../pages/market_pulse/indice';
import Commodity from '../../pages/market_pulse/Commodity';
import Crypto from '../../pages/market_pulse/Crypto';

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
    component: <Forex />,
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
