import React, { useContext } from "react";
import CoinList from "../Components/CoinAPI/GetCoinAPI";
import { WatchListContext } from "../Components/context/watchList";

const HomePage = () => {
  const { cryptoCoin } = useContext(WatchListContext);
  return (
    <div>
      <CoinList data={cryptoCoin} />
    </div>
  );
};

export default HomePage;
