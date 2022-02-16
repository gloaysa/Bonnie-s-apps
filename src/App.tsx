import React, {useState} from 'react';
import './App.css';
import {Outlet} from 'react-router-dom';
import TopNavComponent from './components/top-nav/top-nav.component';
import {getCurrentRoute} from './routes/routes.utils';
import {MainRoutes} from './routes/main-routes';
import HomeRoute from './routes/home/home.route';
import Box from '@mui/material/Box/Box';

const App = (): JSX.Element => {
    const currentRoute = getCurrentRoute();

    const currentRouteIsHome = currentRoute.href === MainRoutes.home;

    return (
        <Box className="App">
            <div className="App-header">
                <TopNavComponent/>
                <h2>{currentRoute.description || currentRoute.label}</h2>
            </div>
            <Outlet />
            {currentRouteIsHome && <HomeRoute />}
        </Box>
    );
}

export default App;
