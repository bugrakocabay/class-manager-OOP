import jwt, { SignOptions } from 'jsonwebtoken';

export const jwtSign = (payload: Object, options?: SignOptions) => {
	return jwt.sign(payload, 'secret-key');
};

export const verifyJwt = <T>(token: string): T | null => {
	try {
		return jwt.verify(token, 'secret-key') as T;
	} catch (error) {
		console.log(error);
		return null;
	}
};
