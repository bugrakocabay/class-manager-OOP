import { Request, Response } from 'express';
import { get, controller, bodyValidator, post } from './decorators';
import { User } from '../models/UserModel';
import bcrypt from 'bcrypt';
import { jwtSign } from '../utils/jwt';

@controller('/api/v1/auth')
class LoginController {
	@post('/register')
	@bodyValidator('username', 'password')
	async postRegister(req: Request, res: Response) {
		try {
			const { username, password, role } = req.body;
			const hashedPassword = await bcrypt.hash(password, 10);

			let user = await User.create({
				username,
				password: hashedPassword,
				role,
			});
			res.send(user);
		} catch (error) {
			console.log(error);
			res.status(500).send('Oops.');
		}
	}

	@post('/login')
	@bodyValidator('username', 'password')
	async postLogin(req: Request, res: Response) {
		try {
			const { username, password } = req.body;

			const user = await User.findOne({ where: { username: username } });
			if (!user) return res.send('no user');

			const match = await bcrypt.compare(password, user.password);
			if (!match) return res.send('bad pass');

			const accessToken = jwtSign(user.id);

			res.cookie('token', accessToken);
			res.send(accessToken);
		} catch (error) {
			console.log(error);
			res.status(500).send('Oops.');
		}
	}

	@get('/logout')
	getLogout(req: Request, res: Response) {
		res.cookie('token', 'asdsad', { maxAge: 1 });
		res.redirect('/api/v1');
	}
}
