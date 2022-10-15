import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../config/database';

interface UserModel
	extends Model<
		InferAttributes<UserModel>,
		InferCreationAttributes<UserModel>
	> {
	// Some fields are optional when calling UserModel.create() or UserModel.build()
	id: CreationOptional<number>;
	username: string;
	password: string;
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
	},
	{ timestamps: true }
);
