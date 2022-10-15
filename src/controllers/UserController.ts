import { Request, Response } from 'express';
import { get, controller, bodyValidator, del, use, put } from './decorators';
import { User } from '../models/UserModel';
import { requireAuth } from '../middlewares/requireAuth';

@controller('/api/v1/users')
class UserController {
	@get('/')
	@use(requireAuth)
	async getUsers(req: Request, res: Response) {
		try {
			const users = await User.findAll();
			if (!users) return res.send('No user found');

			return res.send(users);
		} catch (error) {
			console.log(error);
			res.status(500).send('Oops.');
		}
	}

	@get('/:id')
	@use(requireAuth)
	async getSingleUser(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await User.findOne({ where: { id: id } });
			if (!user) return res.send('No user found');

			res.send(user);
		} catch (error) {
			console.log(error);
			res.status(500).send('Oops.');
		}
	}

	@put('/:id')
	@use(requireAuth)
	@bodyValidator('username')
	async updateUser(req: Request, res: Response) {
		try {
			const { username } = req.body;
			const { id } = req.params;

			if (res.locals && res.locals.user.id != id)
				return res.send('Unauthorized');

			const user = await User.findOne({ where: { id: id } });
			if (!user) {
				return res.send('No user');
			}

			user.username = username;

			await user.save();
			return res.send(user);
		} catch (error) {
			console.log(error);
			res.status(500).send('Oops.');
		}
	}

	@del('/:id')
	@use(requireAuth)
	async deleteUser(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (res.locals && res.locals.user.id != id)
				return res.send('Unauthorized');

			const user = await User.findOne({ where: { id: id } });
			if (!user) {
				return res.send('No user');
			}

			await user.destroy();

			return res.send('User has been deleted');
		} catch (error) {
			console.log(error);
			res.status(500).send('Oops.');
		}
	}
}
