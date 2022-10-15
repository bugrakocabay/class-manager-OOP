import {
	Model,
	DataTypes,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../config/database';

interface ClassModel
	extends Model<
		InferAttributes<ClassModel>,
		InferCreationAttributes<ClassModel>
	> {
	id: CreationOptional<number>;
	class_name: string;
	date: Date;
	teacher?: string;
	status?: string;
	description: string;
	userId?: number;
}

export const Class = sequelize.define<ClassModel>(
	'Class',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		class_name: {
			type: DataTypes.STRING,
		},
		date: {
			type: DataTypes.DATE,
		},
		teacher: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.ENUM('pending', 'finished'),
			defaultValue: 'pending',
		},
		description: {
			type: DataTypes.STRING,
		},
		userId: {
			type: DataTypes.NUMBER,
		},
	},
	{ timestamps: true }
);
