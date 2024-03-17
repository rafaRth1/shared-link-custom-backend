"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksSchema = void 0;
const mongoose_1 = require("mongoose");
exports.LinksSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
const Links = (0, mongoose_1.model)('Links', exports.LinksSchema);
exports.default = Links;
//# sourceMappingURL=Links.js.map