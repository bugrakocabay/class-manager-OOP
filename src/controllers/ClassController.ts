import { Request, Response } from 'express';
import {
	get,
	controller,
	bodyValidator,
	del,
	use,
	put,
	post,
} from './decorators';
import { Class } from '../models/ClassModel';
import { requireAuth } from '../middlewares/requireAuth';

@controller('/api/v1/classes')
class ClassController {
	@post('/')
	@use(requireAuth)
	@bodyValidator('class_name', 'date', 'description')
	async postClass(req: Request, res: Response) {
		try {
			const { class_name, date, description } = req.body;
			const { id } = res.locals.user;
			const newClass = await Class.create({
				class_name,
				date,
				description,
				userId: id,
			});

			res.send(newClass);
		} catch (error) {
			console.log(error);
			res.status(500).send('Oops.');
		}
	}
}
