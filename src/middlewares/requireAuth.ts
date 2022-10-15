import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies.token;

	if (!token) return res.send('Unauthorized');

	try {
		const payload = verifyJwt<{ id: string }>(token);
		const { id } = payload!;

		res.locals.userId = id;
		res.locals.loggedIn = true;
		next();
		return;
	} catch (error) {
		console.log(error);
		return res.send('Error');
	}
}
