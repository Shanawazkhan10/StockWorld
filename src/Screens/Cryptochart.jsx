import React, { useState, useEffect } from "react";
import DisplayChart from "../Components/Chart/DisplayChart";
import { useParams } from "react-router-dom";
import { Button, ToggleButton } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./CryptoChart.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFav, deleteFav } from "../Components/Redux/Action";
import cuid from "cuid";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const Cryptochart = () => {
  let history = useHistory();
  const { id } = useParams();
  // const baseData =
  const dispatch = useDispatch();
  const [UrlData, setUrlData] = useState(id);
  const [TimeInterval, setTimeInterval] = useState(1);
  const [CryptoData, setCryptoData] = useState("");
  const [starColor, setStarColor] = useState("");
  const [deleteIcon, setdeleteIcon] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [dataStore, setDataStore] = useState("");
  const [storeData, setstoreData] = useState(
    useSelector((state) => state.FavList.data.map((el) => el))
  );
  useEffect(() => {
    console.log(storeData);
  }, [storeData]);
  const handleClick = (e) => {
    e.preventDefault();
    setDataStore(dispatch(addFav({ crypto: UrlData, id: cuid() })));
    setStarColor("yellow");
  };
  const handleDelete = (e) => {
    let obj = storeData.find((o) => o.crypto === UrlData);
    console.log(obj.id);
    e.preventDefault();
    setDataStore(dispatch(deleteFav(obj.id)));
    setdeleteIcon("red");
  };
  useEffect(() => {
    setisLoading(true);
    const unsuscribe = async () => {
      let URL1 = `https://api.coingecko.com/api/v3/coins/${UrlData.toLowerCase()}/market_chart?vs_currency=inr&days=1`;
      let URL2 = `https://api.coingecko.com/api/v3/coins/${UrlData.toLowerCase()}/market_chart?vs_currency=inr&days=14`;
      let URL3 = `https://api.coingecko.com/api/v3/coins/${UrlData.toLowerCase()}/market_chart?vs_currency=inr&days=365`;

      const promise1 = axios.get(URL1);
      const promise2 = axios.get(URL2);
      const promise3 = axios.get(URL3);

      const data = await Promise.all([promise1, promise2, promise3]);
      switch (TimeInterval) {
        case 1:
          setTimeout(() => {
            setCryptoData(data[0].data.prices);
            setisLoading(false);
          }, 600);

          break;
        case 14:
          setTimeout(() => {
            setCryptoData(data[1].data.prices);
            setisLoading(false);
          }, 600);
          break;
        case 365:
          setTimeout(() => {
            setCryptoData(data[2].data.prices);
            setisLoading(false);
          }, 600);
          break;

        default:
          break;
      }

      // setisLoading(false);
    };
    unsuscribe();
  }, [TimeInterval]);

  return (
    <div>
      <Container>
        <div>
          <h4>ADD AS FAV </h4>{" "}
          <StarOutlineIcon
            className="star"
            style={{ color: starColor, borderColor: "1 solid gray" }}
            onClick={(e) => handleClick(e)}
          />
          <DeleteOutlineIcon
            className="star"
            style={{ color: deleteIcon, borderColor: "1 solid gray" }}
            onClick={(e) => handleDelete(e)}
          />
        </div>
        <Row className="div-container">
          {isLoading === false ? (
            <Col>
              <DisplayChart data={CryptoData} />
            </Col>
          ) : (
            <div>
              <CircularProgress style={{ marginTop: 150 }} />
            </div>
          )}
        </Row>
        <div className="div-button mt-2">
          <Row className="mt-2">
            <Col>
              {" "}
              <Button
                onClick={() => setTimeInterval(1)}
                style={{ width: 100 }}
                variant="primary"
              >
                1 Day
              </Button>{" "}
              <Button
                onClick={() => setTimeInterval(14)}
                style={{ width: 100 }}
                variant="primary"
              >
                14 Days
              </Button>{" "}
              <Button
                onClick={() => setTimeInterval(365)}
                style={{ width: 100 }}
                variant="primary"
              >
                1 Year
              </Button>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              {" "}
              <Button
                style={{
                  width: 120,
                  borderColor: "#4DF73E",
                  backgroundColor: "transparent",
                  height: 50,
                }}
              >
                <span style={{ color: "#4DF73E" }}>BUY</span>
              </Button>{" "}
              <Button
                style={{
                  width: 120,
                  borderColor: "#E84449",
                  backgroundColor: "transparent",
                  height: 50,
                }}
              >
                <span style={{ color: "#E84449" }}>SELL</span>
              </Button>{" "}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button
                style={{
                  width: 280,
                  border: "none",
                  backgroundColor: "#4DF73E",
                  // height: 50,
                }}
              >
                <span style={{ color: "#fff", fontSize: 17 }}>
                  Placed order&nbsp;
                  <AccessTimeIcon />
                </span>
              </Button>{" "}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Cryptochart;
