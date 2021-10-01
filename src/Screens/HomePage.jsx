import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
const HomePage = (props) => {
  const [StockXvalue, setStockXvalue] = useState([]);
  const [StockYvalue, setStockYvalue] = useState([]);
  useEffect(() => {
    const unsuscribe = async () => {
      const API_KEY = "G1OFVNMJQ9BW70QJ";
      const API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=reliance.bse&outputsize=full&apikey=${API_KEY}`;
      // const getDevices = async () => {
      // const location = window.location.hostname;
      const response = await fetch(API_CALL);
      const data = await response.json();
      if (response.status !== 200) throw Error(data.message);
      let xAxis = [];
      let yAxis = [];
      for (var key in data["Time Series (Daily)"]) {
        xAxis.push(key);
        yAxis.push(data["Time Series (Daily)"][key]["1. open"]);
      }
      // console.log(xAxis, yAxis);
      setStockXvalue(xAxis);
      setStockYvalue(yAxis);
      // console.log(data);

      // console.log();
      // };
    };
    return unsuscribe();
  }, []);

  return (
    <div>
      <h1>STOCK WORLD</h1>
      {/* <p>{StockXvalue}</p>
      {StockXvalue && StockXvalue.map((item) => <p>{item}</p>)}
      {StockYvalue && StockYvalue.map((item) => <p>{item}</p>)} */}
      <Plot
        data={[
          {
            x: StockXvalue,
            y: StockYvalue,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          // { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{
          width: 720,
          height: 540,
          // , title: "A Fancy Plot"
        }}
      />
    </div>
  );
};

export default HomePage;
