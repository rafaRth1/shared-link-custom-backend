import { Schema, model } from 'mongoose';
import { Links } from '../interface/links';

export const LinksSchema = new Schema(
	{
		url: {
			type: String,
			require: String,
			trim: true,
		},

		platformName: {
			type: String,
			require: String,
			trim: true,
		},

		customName: {
			type: String,
			require: String,
			trim: true,
		},

		position: {
			type: Number,
			require: String,
		},
	},
	{
		timestamps: true,
	}
);

const Links = model<Links>('Links', LinksSchema);

export default Links;
