import React, { useState, useEffect } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from "moment/moment";
import todayJson from '../json/today.json';
import Banner from '../partials/Banner';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tailwindConfig, hexToRGB } from '../utils/Utils';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [predictions, setPredictions] = useState(todayJson);


  const Title = (station, selectedDate) => {
    console.log(selectedDate);
    if (selectedDate != null) {
      return station + ' (' + moment(selectedDate).format('MMMM Do YYYY') + ')';
    }
    else {
      return station + ' (' + moment().format('MMMM Do YYYY') + ')';
    }

  }

  const toTimestamp = (strDate) => {
    const dt = new Date(strDate).getTime();
    let temp = dt / 1000;
    moment.locale('en');
    return moment(strDate).format('HH');
  };

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
      * (max - min + 1)) + min;
  };

  const color = { st1: `rgba(${hexToRGB(tailwindConfig().theme.colors.green[900])}, 0.24)`, st2: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[900])}, 0.24)`, st3: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[900])}, 0.24)`, st4: `rgba(${hexToRGB(tailwindConfig().theme.colors.yellow[900])}, 0.24)`, st5: `rgba(${hexToRGB(tailwindConfig().theme.colors.indigo[900])}, 0.24)` }

  const el = { st1: "Station 1", st2: "Station 2", st3: "Station 3", st4: "Station 4", st5: "Station 5" }
  const optionsSetup = {}
  Object.keys(el).map(key => {
    let o = {};
    o = { "station_key": el[key], "station_data": {} }
    optionsSetup[key] = o;
  })
  const [options, setOptions] = useState(optionsSetup);

  let dateOptions = {}

  const tifOptions = Object.keys(el).map(key => {
    dateOptions[key] = new Date()

  });
  const [datesFilter, setDatesFilter] = useState(dateOptions);

  useEffect(() => {
    let tempOptions = {}


    const tifOptions = Object.keys(el).map(key => {
      let hours = [];
      let dataPoints = [];
      let actulaDataPoints = [];


      predictions.map((prediction) => {
        hours.push(toTimestamp(prediction['0']));
        dataPoints.push(parseFloat(prediction['1']) + randomNumberInRange(1, 20));
        actulaDataPoints.push(parseFloat(prediction['1']) + randomNumberInRange(1, 20));

      })



      let optionsData = {
        chart: {
          zoomType: 'xy'
        },
        title: {
          text: Title(el[key]),
          align: 'center'
        },
        subtitle: {
          text: '',
          align: 'Number of bikes in Demand' //need to change here
        },
        xAxis: [{
          categories: hours,
          crosshair: true
        }],
        yAxis: [{ // Primary yAxis
          labels: {
            format: '{value}',
            style: {
              color: Highcharts.getOptions().colors[1]
            }
          },
          title: {
            text: 'Number of bikes in Demand', //the text on the y-axis of the chart is getting controlled from here
            style: {
              color: Highcharts.getOptions().colors[1]
            }
          }
        }, { // Secondary yAxis
          title: {
            text: '',
            style: {
              color: Highcharts.getOptions().colors[0]
            }
          },
          labels: {
            format: '{value}',
            style: {
              color: Highcharts.getOptions().colors[0]
            }
          },
          opposite: true
        }],
        tooltip: {
          shared: true
        },
        legend: {
          align: 'left',
          x: 80,
          verticalAlign: 'top',
          y: 60,
          floating: true,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)'
        },
        series: [{
          name: 'Predicted Values',
          type: 'column',
          yAxis: 1,
          data: dataPoints,
          tooltip: {
            valueSuffix: ''
          },
          color: color[key]

        }, {
          name: 'Actual Values',
          type: 'scatter',
          data: actulaDataPoints,
          tooltip: {
            valueSuffix: ''
          }
        }]
      };
      let o = {};
      o = { "station_key": el[key], "station_data": optionsData }
      tempOptions[key] = o

      setOptions(prev => ({
        ...prev,
        ...tempOptions
      }));

    })

  }, [predictions]);


  const filterStation = (selectedStation, selectedDate) => {
    //need to change here and check
    let tempOptions = {}

    let hours = [];
    let dataPoints = [];
    let actulaDataPoints = [];

    predictions.map((prediction) => {
      hours.push(toTimestamp(prediction['0']));
      dataPoints.push(parseFloat(prediction['1']) + randomNumberInRange(1, 20));
      actulaDataPoints.push(parseFloat(prediction['1']) + randomNumberInRange(1, 20));

    })

    let optionsData = {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: Title(el[selectedStation], selectedDate),
        align: 'center'
      },
      subtitle: {
        text: '',
        align: 'Number of bikes in Demand' //need to change here
      },
      xAxis: [{
        categories: hours,
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: 'Number of bikes in Demand',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      }, { // Secondary yAxis
        title: {
          text: '',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 60,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          'rgba(255,255,255,0.25)'
      },
      series: [{
        name: 'Predictions',
        type: 'column',
        yAxis: 1,
        data: dataPoints,
        tooltip: {
          valueSuffix: ''
        },
        color: color[selectedStation]

      }, {
        name: 'Actual Data',
        type: 'scatter',
        data: actulaDataPoints,
        tooltip: {
          valueSuffix: ''
        }
      }]
    };
    let o = {};
    o = { "station_key": el[selectedStation], "station_data": optionsData }
    tempOptions[selectedStation] = o

    setOptions(prev => ({
      ...prev,
      ...tempOptions
    }));

  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">



            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
            

            </div>

            {/* Cards */}

            <div className="grid grid-cols-2 gap-9">
            {Object.keys(el).map(key => {
              return(
            <>
              {Object.keys(options[key].station_data).length > 0 ?
                <>
                   {/* need to change here */}
                  <div className="py-2">
                    <div className=" date-picker-container">
                    <label className="filter-labels px-2 font-bold">Date</label>
                    <DatePicker className={`form-control`} selected={datesFilter[key]} onChange={(date) => {

                      let limit = moment().add(1, 'days');

                      let optionKey = key;
                      if (date <= limit) {
                        let o = {};
                        o[optionKey] = date;

                        setDatesFilter(prev => ({
                          ...prev,
                          ...o
                        }));
                        filterStation(optionKey, date);
                      }
                      //need to change

                    }} />
                  </div>
                  <div className="py-2">
                    <HighchartsReact highcharts={Highcharts} options={options[key].station_data} />
                  </div>
                  </div>
                </>
                : null}


            </>
              )
            })}
            </div>
           
            
          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;