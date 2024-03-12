import { Document } from 'mongoose';

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	nickName: string;
	password: string;
	email: string;
	img: string;
	token: string;
	confirm: boolean;
	isModified: (path: string) => boolean;
	checkPassword: (password: string) => Promise<boolean>;
}
