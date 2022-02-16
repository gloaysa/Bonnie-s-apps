import React from 'react';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs/Tabs';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import {getCurrentRoute, mainRoutes} from '../../routes/routes.utils';

const TopNavComponent = () => {
    const currentTab = getCurrentRoute().href;

    return (
        <Box sx={{ flexGrow: 1 }} className='top-nav'>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Tabs value={currentTab} variant="scrollable" textColor="inherit" scrollButtons="auto">
                        {mainRoutes.map(tab => <Tab key={tab.href} label={tab.label} value={tab.href} to={tab.href} component={Link} />)}
                    </Tabs>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopNavComponent;
