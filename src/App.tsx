import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import TopNavComponent from "./components/top-nav/top-nav.component";
import { getCurrentRoute } from "./routes/routes.utils";
import { MainRoutes } from "./routes/main-routes";
import HomeRoute from "./routes/home/home.route";
import Box from "@mui/material/Box/Box";
import { positions, Provider as AlertProvider, transitions } from "react-alert";
import AlertComponent from "./components/alert/alert.component";

const App = (): JSX.Element => {
  const currentRoute = getCurrentRoute();

  const currentRouteIsHome = currentRoute.href === MainRoutes.home;
  const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: "60px",
    transition: transitions.SCALE,
  };

  return (
    <AlertProvider template={AlertComponent} {...alertOptions}>
      <Box className="App">
        <div className="App-header">
          <TopNavComponent />
          <h2>{currentRoute.description || currentRoute.label}</h2>
        </div>
        <Outlet />
        {currentRouteIsHome && <HomeRoute />}
      </Box>
    </AlertProvider>
  );
};

export default App;
