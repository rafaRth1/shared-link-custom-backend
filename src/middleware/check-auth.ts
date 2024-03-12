import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { IUser } from '../interface/IUser.js';

interface RequestUser extends Request {
	user: IUser;
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

			req.user = await User.findById(decoded?.id).select(
				'-password -confirmado -token -createdAt -updatedAt -__v'
			);
		} catch (error) {
			return res.status(404).json({ msg: 'Hubo un error' });
		}
	}

	if (!token) {
		const error = new Error('Token no valido');
		return res.status(401).json({ msg: error.message });
	}

	next();
};

export default checkAuth;
