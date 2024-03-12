import { Document, Model } from 'mongoose';

export interface Links extends Model<any> {
	_id: string;
	url: string;
	platformName: string;
	customName: string;
}
