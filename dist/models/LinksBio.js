"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Links_1 = require("./Links");
const LinksBioSchema = new mongoose_1.Schema({
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
    links: [Links_1.LinksSchema],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const LinksBio = (0, mongoose_1.model)('LinksBio', LinksBioSchema);
exports.default = LinksBio;
