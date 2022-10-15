// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// Imports
import './controllers/LoginController';
import './controllers/RootController';
import './controllers/UserController';
import { AppRouter } from './AppRouter';
import { sequelize } from './config/database';

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Router
app.use(AppRouter.getInstance());

// Server
app.listen(3000, () => {
	sequelize.sync();
	console.log('Listening on port 3000');
});
