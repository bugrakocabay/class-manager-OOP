import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../config/database';
import { Class } from './ClassModel';

interface UserModel
	extends Model<
		InferAttributes<UserModel>,
		InferCreationAttributes<UserModel>
	> {
	id: CreationOptional<number>;
	username: string;
	password: string;
	role?: string;
}

export const User = sequelize.define<UserModel>(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM('student', 'teacher', 'admin'),
		},
	},
	{ timestamps: true }
);

User.hasMany(Class, { onDelete: 'cascade', foreignKey: 'userId' });
