import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { HashRouter, Route, Routes} from 'react-router-dom';
import SplitNamesRoute from './routes/split-names/split-names.route';
import WebDownloaderRoute from './routes/web-downloader/web-downloader.route';
import {MainRoutes} from './routes/main-routes.enum';

ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path={MainRoutes.splitNames} element={<SplitNamesRoute />} />
                <Route path={MainRoutes.webDownloader} element={<WebDownloaderRoute />} />
            </Route>
        </Routes>
    </HashRouter>,
  document.getElementById('root')
);
