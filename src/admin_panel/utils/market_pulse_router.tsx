import Forex from '../../pages/market_pulse/forex';
import Indice from '../../pages/market_pulse/indice';

export const market_pulse_router = [
  {
    route: '/market-pulse/forex',
    component: <Forex />,
  },
  {
    route: '/market-pulse/commodities',
    component: <Forex />,
  },
  {
    route: '/market-pulse/indices',
    component: <Indice />,
  },
  {
    route: '/market-pulse/crypto',
    component: <Forex />,
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
