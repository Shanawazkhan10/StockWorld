import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { historyOptions } from "./chartConfig";
import moment from "moment";
const DisplayChart = (data) => {
  const [ApiData, setApiData] = useState(data.data);

  useEffect(() => {
    var timeArray = [];
    var priceArray = [];
    for (var key in ApiData) {
      var unixtimestamp = ApiData[key][0];
      let result = moment(unixtimestamp).format("hh:mm A");
      timeArray.push(result);
    }
    for (var key in ApiData) {
      priceArray.push(ApiData[key][1]);
      //   setTime(timeArray);
    }
    // console.log("ssss", Time);
    if (chartRef && chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: timeArray,
          datasets: [
            {
              label: "Increase Decrease Order",
              data: priceArray,

              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              //   borderWidth: 1,
              pointRadius: 0,
            },
          ],
        },
        options: historyOptions,
      });
    }
  }, []);
  const chartRef = useRef();
  return (
    <div>
      <canvas ref={chartRef} id="myChart" width="400" height="380"></canvas>
    </div>
  );
};

export default DisplayChart;
