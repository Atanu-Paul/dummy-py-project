import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import { AlertCoumnsDiv } from "./elements";
import moment from "moment/moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import danger from "../../images/danger.png";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../../partials/dashboard/DashboardAvatars";
import Banner from "../../partials/Banner";
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

HighchartsMap(Highcharts);

const AlertCoumns = () => {
  // const el = {
  //   1: "Station 1",
  //   2: "Station 2",
  //   3: "Station 3",
  //   4: "Station 4",
  //   5: "Station 5",
  // };
  const el = { st1: "1", st2: "2", st3: "3", st4: "4", st5: "5" };
  const [criticalAlerts, setCriticalAlerts] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [options, setOptions] = useState(null);
  const [datesFilter, setDatesFilter] = useState(new Date());
  const [timeFilter, setTimeFilter] = useState("10:00");
  const [loading, setLoading] = useState(true);

  const Title = (selectedDate) => {
    if (selectedDate != null) {
      return "Heat Map (" + moment(selectedDate).format("MMMM Do YYYY") + ")";
    } else {
      return "Heat Map (" + moment().format("MMMM Do YYYY") + ")";
    }
  };

  useEffect(() => {
    if (loading == true) {
      let stationCountTemp = {};
      let colors = {};

      setCriticalAlerts(null);

      let actualData = [];
      let data = [];

      let x = 0;
      let y = null;

      Object.keys(el).map((key) => {
        let o = {};
        let p = {};

        let point = randomNumberInRange(30, 50);
        let predictedPoint = randomNumberInRange(50, 80);

        actualData.push([key, point]);
        data.push([key, predictedPoint]);

        stationCountTemp[key] = { actual: point, predicted: predictedPoint };
      });

      for (const [key, temp] of Object.entries(stationCountTemp)) {
        let diff = parseInt(temp.predicted) - parseInt(temp.actual);
        if (diff < 10) {
          colors[key] = {
            name: el[key],
            color: `rgba(${hexToRGB(tailwindConfig().theme.colors.green[900])}, 0.24)`,
            ucCode: key.toUpperCase(),
            diff: diff,
          };
        } else if (diff > 10 && diff <= 20) {
          colors[key] = {
            name: el[key],
            color: `rgba(${hexToRGB(tailwindConfig().theme.colors.yellow[900])}, 0.24)`,
            ucCode: key.toUpperCase(),
            diff: diff,
          };
        } else if (diff > 20) {
          colors[key] = {
            name: el[key],
            color: `rgba(${hexToRGB(tailwindConfig().theme.colors.red[900])}, 0.24)`,
            ucCode: key.toUpperCase(),
            diff: diff,
          };

          y = diff > x ? key : y;
          x = diff > x ? diff : x;
        }
      }

      // console.log(y);
      // console.log(x);

      if (x > 0 && y != null) {
        let alert = { x: x, y: y };
        setCriticalAlerts((prev) => ({
          ...prev,
          ...alert,
        }));
      }

      const getData = (data) =>
        data.map((point) => ({
          name: point[0],
          y: point[1],
          color: colors[point[0]].color,
        }));

      let tempOptions = {
        chart: {
          type: "column",
        },
        // Custom option for templates
        colors,
        title: {
          text: Title(),
          align: "center",
        },
        plotOptions: {
          series: {
            grouping: false,
            borderWidth: 0,
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          shared: true,
          headerFormat:
            '<span style="font-size: 15px">' +
            "{series.chart.options.colors.(point.key).name}" +
            "</span><br/>",
          pointFormat: "{series.name}: <b>{point.y} medals</b><br/>",
        },
        xAxis: {
          title: {
            text: "Station Number",
            style: {
              fontSize: "20px",
              fontWeight: 500,
            },
          },
          type: "category",
          accessibility: {
            description: "Station Number",
          },
          max: 4,
          labels: {
            useHTML: true,
            animate: true,
            format:
              "{chart.options.colors.(value).ucCode}<br>" +
              "<span>" +
              '<span style="display:inline-block;height:32px;vertical-align:text-top;" ' +
              "></span></span>",
            style: {
              textAlign: "center",
              fontSize: "20px",
              fontWeight: 500,
            },
          },
        },
        yAxis: [
          {
            title: {
              text: "Numer of Bikes",
              style: {
                fontSize: "20px",
                fontWeight: 500,
              },
            },
            showFirstLabel: false,
          },
        ],
        series: [
          {
            color: "rgba(158, 159, 163, 0.5)",
            pointPlacement: -0.2,
            linkedTo: "main",
            data: actualData,
            name: "Actual Data",
          },
          {
            name: "Predicted Data",
            id: "main",
            dataLabels: [
              {
                enabled: true,
                inside: true,
                style: {
                  fontSize: "16px",
                },
              },
            ],
            data: getData(data),
          },
        ],
      };
      setOptions(tempOptions);
      setLoading(false);
    }
  }, [loading]);

  const filterStation = (selectedDate) => {
    let stationCountTemp = {};
    let colors = {};

    let actualData = [];
    let data = [];

    Object.keys(el).map((key) => {
      let o = {};
      let p = {};

      let point = randomNumberInRange(30, 50);
      let predictedPoint = randomNumberInRange(50, 80);

      actualData.push([key, point]);
      data.push([key, predictedPoint]);

      stationCountTemp[key] = { actual: point, predicted: predictedPoint };
    });

    for (const [key, temp] of Object.entries(stationCountTemp)) {
      let diff = parseInt(temp.predicted) - parseInt(temp.actual);
      if (diff < 10) {
        colors[key] = {
          name: el[key],
          color: "#a1e582",
          ucCode: key.toUpperCase(),
          diff: diff,
        };
      } else if (diff > 10 && diff <= 20) {
        colors[key] = {
          name: el[key],
          color: "#f5ca47",
          ucCode: key.toUpperCase(),
          diff: diff,
        };
      } else if (diff > 20) {
        colors[key] = {
          name: el[key],
          color: "#c83128",
          ucCode: key.toUpperCase(),
          diff: diff,
        };
      }
    }

    const getData = (data) =>
      data.map((point) => ({
        name: point[0],
        y: point[1],
        color: colors[point[0]].color,
      }));

    let tempOptions = {
      chart: {
        type: "column",
      },
      // Custom option for templates
      colors,
      title: {
        text: Title(),
        align: "center",
      },
      plotOptions: {
        series: {
          grouping: false,
          borderWidth: 0,
        },
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        headerFormat:
          '<span style="font-size: 15px">' +
          "{series.chart.options.colors.(point.key).name}" +
          "</span><br/>",
        pointFormat: "{series.name}: <b>{point.y} medals</b><br/>",
      },
      xAxis: {
        title: {
          text: "Station Number",
          style: {
            fontSize: "20px",
            fontWeight: 500,
          },
        },
        type: "category",
        accessibility: {
          description: "Station Number",
        },
        max: 4,
        labels: {
          useHTML: true,
          animate: true,
          format:
            "{chart.options.colors.(value).ucCode}<br>" +
            "<span>" +
            '<span style="display:inline-block;height:32px;vertical-align:text-top;" ' +
            "></span></span>",
          style: {
            textAlign: "center",
            fontSize: "20px",
            fontWeight: 500,
          },
        },
      },
      yAxis: [
        {
          title: {
            text: "Numer of Bikes",
            style: {
              fontSize: "20px",
              fontWeight: 500,
            },
          },
          showFirstLabel: false,
        },
      ],
      series: [
        {
          color: "rgba(158, 159, 163, 0.5)",
          pointPlacement: -0.2,
          linkedTo: "main",
          data: actualData,
          name: "Actual Data",
        },
        {
          name: "Predicted Data",
          id: "main",
          dataLabels: [
            {
              enabled: true,
              inside: true,
              style: {
                fontSize: "16px",
              },
            },
          ],
          data: getData(data),
        },
      ],
    };
    setOptions(tempOptions);
    setLoading(false);
  };

  const DateFilterContainer = ({ dateSelected, optionKey }) => {
    return (
      <DatePicker
        className={`form-control`}
        selected={dateSelected}
        onChange={(date) => {
          let limit = moment().add(1, "days");
          if (date <= limit) {
            setDatesFilter(date);
            setLoading(true);
          }
        }}
      />
    );
  };

  return (
    // <div className="flex h-screen overflow-hidden">
    //   {/* Sidebar */}
    //   <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    //   {/* Content area */}
    //   <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
    //     {/*  Site header */}
    //     <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    //     <main>
    //       <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
    //         {/* Dashboard actions */}
    //         <div className="sm:flex sm:justify-between sm:items-center mb-8">
    //           {/* Left: Avatars */}
    //           <DashboardAvatars />

    //           {/* Right: Actions */}
    //         </div>

    //         {/* Cards */}

            <div className="col-md-12">
              <AlertCoumnsDiv>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2"></div>
                    <div className="col-md-6 chart-container-1">
                      {options != null ? (
                        <>
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                            constructorType={"mapChart"}
                          />
                          <ul className="chart-legend">
                            <li>
                              <span className="legend-label">
                                <span className="legend-icon grey"></span>
                                Current State
                              </span>
                            </li>
                            <li>
                              <span className="legend-label">
                                <span className="legend-icon green"></span>
                                Low Gap in Range
                              </span>
                            </li>
                            <li>
                              <span className="legend-label">
                                <span className="legend-icon yellow"></span>
                                Medium Gap in Range
                              </span>
                            </li>
                            <li>
                              <span className="legend-label">
                                <span className="legend-icon red"></span>
                                Critical gap in Range
                              </span>
                            </li>
                          </ul>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </AlertCoumnsDiv>
              <div className="col-md-6">
                  <div className="flex">
                      <div>
                        <label className="filter-labels">Date</label>
                        <DateFilterContainer dateSelected={datesFilter} />
                      </div>
                      <div>
                        <label className="filter-labels">Time</label>
                        <TimePicker
                          onChange={(time) => {
                            if (time != null) {
                              setTimeFilter(time);
                              //setLoading(true);
                              filterStation(datesFilter);
                            }
                          }}
                          value={timeFilter}
                          locale="sv-sv"
                          disableClock={true}
                          format={"HH:mm"}
                          className="timepicker-cst"
                        />
                      </div>
                      </div>
                      {criticalAlerts != null ? (
                        <div>
                          <label
                            className="filter-labels"
                            style={{ opacity: "0" }}
                          >
                            Time
                          </label>
                          <div className="critial-alert flex justify-center">
                            <h3 className="critital-title"><strong>Critical</strong></h3>

                            <div className="critical-message-container">
                              <img src={danger} style={{ width: "50%" }} />
                              <span className="critical-message">
                                Move{" "}
                                <span className="highlight-alert">
                                  {criticalAlerts.x}
                                </span>{" "}
                                cyles to{" "}
                                <span className="highlight-alert">
                                  Station {criticalAlerts.y}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
            </div>
        //   </div>
        // </main>

    //     <Banner />
    //   </div>
    // </div>
  );
};

export default AlertCoumns;
