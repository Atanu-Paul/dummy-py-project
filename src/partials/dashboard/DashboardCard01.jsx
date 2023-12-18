import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard01() {



  return (
    <>
    {Object.keys(el).map(key => {

      return (
          <>
              {Object.keys(options[key].station_data).length > 0 ?
                 
                          <HighchartsReact highcharts={Highcharts} options={options[key].station_data} />
                  : null}

          </>

      )
  })}
  </>
  );
}

export default DashboardCard01;
