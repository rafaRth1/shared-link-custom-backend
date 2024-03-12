import { Request, Response } from 'express';
import { IUser } from './IUser';

export interface RequestUser extends Request {
	user: IUser;
}
