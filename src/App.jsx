import React, { useEffect, lazy } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
// import Dashboard from './pages/Dashboard';
// import HeatMap from './pages/HeatMap';
// import AlertCoumns from './pages/AlertColumns/index';
// import Settings from './pages/Settings';
// import Pga from "./pages/predectiveAnalisisGap"

const Dashboard = lazy(() => import('./pages/Dashboard'));
const HeatMap = lazy(() => import('./pages/HeatMap'));
const AlertCoumns  = lazy(() => import('./pages/AlertColumns/index'));
const Settings = lazy(() => import('./pages/Settings'));


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/heat-map" element={<HeatMap />} />
        {/* <Route exact path="/predicted-gap-analysis" element={<Pga />} /> */}
        <Route exact path="/alert-column-map" element={<AlertCoumns />} />
        <Route exact path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
