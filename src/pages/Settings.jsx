import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import { HeatMapDiv } from "./elements";
import moment from "moment/moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import Banner from '../partials/Banner';
// const val = require("highcharts/modules/exporting")(Highcharts);
// const va1l = require("highcharts/highcharts-more")(Highcharts);
import './HeatMap.css';


HighchartsMap(Highcharts);

const Settings = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const el = { st1: "1", st2: "2", st3: "3", st4: "4", st5: "5" }


    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

    const [options, setOptions] = useState(null);
    const [datesFilter, setDatesFilter] = useState(new Date());
    const [timeFilter, setTimeFilter] = useState('10:00');
    const [loading, setLoading] = useState(true);

    const Title = (selectedDate) => {

        if (selectedDate != null) {
            return 'Cycle Distribution At Stations <sub>(' + moment(selectedDate).format('MMMM Do YYYY') + ')</sub>';
        }
        else {
            return 'Cycle Distribution At Stations <sub>(' + moment().format('MMMM Do YYYY') + ')</sub>';
        }

    }

    useEffect(() => {
        if (loading == true) {
            let stationCountTemp = []
            Object.keys(el).map(key => {
                let o = {};
                let point = randomNumberInRange(1, 100);
                let p = []
                p.push({ "name": el[key], value: point })
                o = { "name": el[key], data: p }
                stationCountTemp.push(o);
            })

            const tempOptions = {
                chart: {
                    type: "packedbubble",
                    height: "70%"
                },
                title: {
                    text: Title(),
                    align: 'center'
                },
                tooltip: {
                    useHTML: true,
                    pointFormat: '<b>Cycle count:</b> {point.value}'
                },
                plotOptions: {
                    packedbubble: {
                        minSize: '30%',
                        maxSize: '120%',
                        zMin: 0,
                        zMax: 1000,
                        layoutAlgorithm: {
                            splitSeries: false,
                            gravitationalConstant: 0.02
                        },
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                            style: {
                                color: 'black',
                                textOutline: 'none',
                                fontWeight: 'normal',
                                fontSize: 18
                            }
                        }
                    }
                },
                series: stationCountTemp
            };


            setOptions(tempOptions);
            setLoading(false);
        }
    }, [loading]);


    const filterStation = (selectedDate) => {

        let stationCountTemp = []
            Object.keys(el).map(key => {
                let o = {};
                let point = randomNumberInRange(1, 100);
                let p = []
                p.push({ "name": el[key], value: point })
                o = { "name": el[key], data: p }
                stationCountTemp.push(o);
            })

            const tempOptions = {
                chart: {
                    type: "packedbubble",
                    height: "70%"
                },
                title: {
                    text: Title(selectedDate),
                    align: 'center'
                },
                tooltip: {
                    useHTML: true,
                    pointFormat: '<b>Cycle count:</b> {point.value}'
                },
                plotOptions: {
                    packedbubble: {
                        minSize: '30%',
                        maxSize: '120%',
                        zMin: 0,
                        zMax: 1000,
                        layoutAlgorithm: {
                            splitSeries: false,
                            gravitationalConstant: 0.02
                        },
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                            style: {
                                color: 'black',
                                textOutline: 'none',
                                fontWeight: 'normal',
                                fontSize: 18
                            }
                        }
                    }
                },
                series: stationCountTemp
            };


            setOptions(tempOptions);
            setLoading(false);

    }




    const DateFilterContainer = ({ dateSelected, optionKey }) => {


        return (
            <DatePicker className={`form-control`} selected={dateSelected} onChange={(date) => {
                let limit = moment().add(1, 'days');
                if (date <= limit) {
                    setDatesFilter(date);
                    //setLoading(true);
                    filterStation(date);
                }
            }} />
        );
    };

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
    
                <div className="grid grid-cols-2 gap-1">
                <div className="HeatMapApp">
          <div className="HeatMapcontainer">
            <h1>
              Page
              <br />
              Coming Soon
            </h1>
           
          </div>
        </div>
                </div>
               
                
              </div>
            </main>
    
            <Banner />
    
          </div>
        </div>
      );


  
}




export default Settings;
