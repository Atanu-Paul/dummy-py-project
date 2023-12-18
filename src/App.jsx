import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import HeatMap from './pages/HeatMap';
import AlertCoumns from './pages/AlertColumns/index';
import Settings from './pages/Settings';

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
        <Route exact path="/alert-column-map" element={<AlertCoumns />} />
        <Route exact path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
