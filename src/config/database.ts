import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('development', 'username', 'password', {
	dialect: 'sqlite',
	storage: './development.sqlite',
	logging: false,
});
