import React from 'react';
import {Link} from 'react-router-dom';
import {MainRoutes} from '../../routes/main-routes.enum';

const TopNavComponent = () => {
    return (
        <nav
            style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem"
            }}
        >
            <Link to="/">Home</Link> |{" "}
            <Link to={`/${MainRoutes.splitNames}`}>Split Names</Link> |{" "}
            <Link to={`/${MainRoutes.webDownloader}`}>Web Downloader</Link>
        </nav>
    )
}

export default TopNavComponent;
