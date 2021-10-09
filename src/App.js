// import Login from "./Components/Login";
import "./App.css";
import HomePage from "./Screens/HomePage";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { WatchListContextProvider } from "./Components/context/watchList";
import Cryptochart from "./Screens/Cryptochart";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <WatchListContextProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/Cryptochart/:id" component={Cryptochart}></Route>
          </Switch>
          <Footer />
        </Router>
      </WatchListContextProvider>
    </div>
  );
}

export default App;
