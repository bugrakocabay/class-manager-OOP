import { Request, Response } from 'express';
import { get, controller, use } from './decorators';
import { requireAuth } from '../middlewares/requireAuth';

@controller('/api/v1')
class RootController {
	@get('/')
	getRoot(req: Request, res: Response) {
		if (res.locals && res.locals.loggedIn) {
			res.send(`
        <div>
          <div>You are logged in</div>
          <a href="/auth/logout">Logout</a>
        </div>
      `);
		} else {
			res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/auth/login">Login</a>
        </div>
      `);
		}
	}

	@get('/protected')
	@use(requireAuth)
	getProtected(req: Request, res: Response) {
		res.send('Welcome to protected route, logged in user');
	}
}
