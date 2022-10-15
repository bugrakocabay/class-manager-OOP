import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { User } from '../models/UserModel';

export async function requireAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.cookies.token;

	if (!token) return res.send('Unauthorized');

	try {
		const payload = verifyJwt<{ id: string }>(token);
		const id = payload!;

		const user = await User.findOne({ where: { id: id } });

		res.locals.user = user;
		res.locals.loggedIn = true;

		next();
		return;
	} catch (error) {
		console.log(error);
		return res.send('Error');
	}
}
