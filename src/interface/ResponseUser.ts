import { Response } from 'express';
import { IUser } from './IUser';

export interface ResponseUser extends Response {
	user: IUser;
}
