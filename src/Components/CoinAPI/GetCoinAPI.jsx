import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import "bootstrap/dist/css/bootstrap.min.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import IconButton from "@mui/icons-material/IconButton";
import "./style.css";
const CoinList = (props) => {
  const [CoinList, setCoinList] = useState([]);
  let history = useHistory();
  const handleToggle = (value) => () => {
    // console.log(value);
    history.push(`/Cryptochart/${value}`);
  };
  useEffect(() => {
    const unsuscribe = async () => {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${props.data}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
        .then((res) => res.json())
        .then((result) => {
          setCoinList(result);
          // console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return unsuscribe();
  }, []);

  return (
    <div>
      <ListItem style={{ backgroundColor: "lightgray" }}>
        {/* <ListItemButton> */}
        <ListItemIcon></ListItemIcon>
        <ListItemText primary={"Coins"} />
        <ListItemText primary={"Price (INR)"} />
        <ListItemText primary={"24hr (%)"} />
        {/* </ListItemButton> */}
      </ListItem>
      {CoinList &&
        CoinList.map((item) => (
          <ListItem
            onClick={console.log("HELLO WORLD")}
            style={{ height: 55 }}
            className="listItem"
            key={item.name}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <StarBorderIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(item.name)}
              dense
            >
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src={item.image}
                  sx={{ width: 35, height: 35 }}
                />
              </ListItemIcon>
              <ListItemText style={{ width: 42 }} primary={item.name} />
              <ListItemText
                style={
                  item.current_price > 0
                    ? { color: "green", width: 20 }
                    : { color: "red", width: 20 }
                }
                primary={item.current_price}
              />
              <div style={{ display: "flex" }}>
                <ListItemText
                  style={
                    item.market_cap_change_percentage_24h > 0
                      ? { color: "green", width: 20 }
                      : { color: "red", width: 20 }
                  }
                  primary={item.market_cap_change_percentage_24h}
                />
                {item.market_cap_change_percentage_24h > 0 ? (
                  <ArrowUpwardIcon
                    fontSize="small"
                    style={{ marginTop: 4, marginLeft: 35, color: "green" }}
                  />
                ) : (
                  <ArrowDownwardIcon
                    fontSize="small"
                    style={{ marginTop: 4, marginLeft: 35, color: "red" }}
                  />
                )}
              </div>
            </ListItemButton>
          </ListItem>
        ))}
    </div>
  );
};

export default CoinList;
