import mongoose, { Schema, Types, model } from 'mongoose';
import { LinksSchema } from './Links';
import { LinksBio } from '../interface/links-bio';

const LinksBioSchema = new Schema(
	{
		name: {
			type: String,
			require: String,
			trim: true,
			unique: true,
		},

		title: {
			type: String,
			require: String,
			trim: true,
			unique: true,
		},

		description: {
			type: String,
			require: String,
			trim: true,
		},

		imageProfile: {
			type: String,
			require: String,
			trim: true,
		},

		bannerImage: {
			type: String,
			require: String,
			trim: true,
		},

		links: [LinksSchema],

		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const LinksBio = model<LinksBio>('LinksBio', LinksBioSchema);

export default LinksBio;
