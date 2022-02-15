import express from 'express';
import cors, {CorsOptions} from 'cors';
// const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');

const server = express();

const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000'
}

server.use(cors(corsOptions))
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', indexRouter);
server.use('/scrape', indexRouter);

const PORT = 5500;
server.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));

export default server;
