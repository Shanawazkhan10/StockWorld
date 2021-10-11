import useEventCallback from "@mui/utils/useEventCallback";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CoinList from "../../Components/CoinAPI/GetCoinAPI";
const Favourite = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [dataId, setDataId] = useState("");
  const [state, setstate] = useState(
    useSelector((state) => state.FavList.data.map((el) => el))
  );

  useEffect(() => {
    const value = state.map((v) => v.crypto.toLowerCase());

    setData(value);
  }, [state]);

  return (
    <div>
      {data.length !== 0 ? (
        <CoinList data={data} />
      ) : (
        <h1>Add Favourite First</h1>
      )}
    </div>
  );
};

export default Favourite;
