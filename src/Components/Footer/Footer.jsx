import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
export default function LabelBottomNavigation() {
  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  const [value, setValue] = React.useState(pathname);

  const useStyles = makeStyles((theme) => ({
    stickToBottom: {
      width: "100%",
      position: "fixed",
      bottom: 0,
    },
  }));

  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      className={classes.stickToBottom}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="home"
        value="/"
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
        component={Link}
        to="/Favourite"
      />
      {/* <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      /> */}
      <BottomNavigationAction
        label="Wallet"
        value="Wallet"
        icon={<AccountBalanceWalletIcon />}
      />
    </BottomNavigation>
  );
}
