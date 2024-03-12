import { Document, Model, Types } from 'mongoose';
import { Links } from './links';

export interface LinksBio extends Document {
	_id: string;
	name: string;
	title: string;
	description: string;
	imageProfile: string;
	bannerImage: string;
	links: Model<any> & Types.DocumentArray<Links>;
	user: string;
}
