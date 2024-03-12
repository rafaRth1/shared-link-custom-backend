"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploadImage = exports.reorderPositionLinksBio = exports.deleteLinkBio = exports.editLinkBio = exports.addLinkBio = exports.editValuesBio = void 0;
const mongoose_1 = require("mongoose");
const LinksBio_1 = __importDefault(require("../models/LinksBio"));
const editValuesBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, title, description, imageProfile, bannerImage } = req.body;
    const userBio = yield LinksBio_1.default.findById({ _id }).select('-createdAt -updatedAt -__v -updatedAt');
    if (!userBio) {
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message });
    }
    userBio.title = title || userBio.title;
    userBio.description = description || userBio.description;
    userBio.imageProfile = imageProfile || userBio.imageProfile;
    userBio.bannerImage = bannerImage || userBio.bannerImage;
    try {
        const userBioUpdate = yield userBio.save();
        res.json({
            linkBio: userBioUpdate,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.editValuesBio = editValuesBio;
const addLinkBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idBio, url, customName, platformName, position, } = req.body;
    const userBio = yield LinksBio_1.default.findById({ _id: idBio });
    const link = yield (userBio === null || userBio === void 0 ? void 0 : userBio.links.create({ url, customName, platformName, position: position }));
    userBio === null || userBio === void 0 ? void 0 : userBio.links.push(link);
    try {
        yield (userBio === null || userBio === void 0 ? void 0 : userBio.save());
        return res.json({
            link,
            links: userBio === null || userBio === void 0 ? void 0 : userBio.links,
        });
    }
    catch (error) {
        console.log(error);
    }
    console.log(link);
});
exports.addLinkBio = addLinkBio;
const editLinkBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userBio = yield LinksBio_1.default.findOneAndUpdate({
        _id: new mongoose_1.Types.ObjectId(req.body._id),
        'links._id': new mongoose_1.Types.ObjectId(req.body.idLink),
    }, {
        $set: { 'links.$.url': req.body.url, 'links.$.customName': req.body.custonName },
    }, {
        projection: { links: { $elemMatch: { _id: new mongoose_1.Types.ObjectId(req.body.idLink) } }, _id: 0 },
        returnDocument: 'after',
        returnNewDocument: true,
    });
    if (!userBio) {
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message });
    }
    res.json({
        linkUpdate: userBio.links[0],
    });
});
exports.editLinkBio = editLinkBio;
const deleteLinkBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userBio = yield LinksBio_1.default.findById({ _id: req.body.idLinkBio });
    userBio === null || userBio === void 0 ? void 0 : userBio.links.pull(req.params.id);
    try {
        yield (userBio === null || userBio === void 0 ? void 0 : userBio.save());
        res.json({
            userBio,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteLinkBio = deleteLinkBio;
const reorderPositionLinksBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
});
exports.reorderPositionLinksBio = reorderPositionLinksBio;
const handleUploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // const image = await Image.create(req.body);
    // res.json(image);
});
exports.handleUploadImage = handleUploadImage;
// const userBio = await LinksBio.aggregate([
// 	{ $match: { _id: new Types.ObjectId(req.body._id) } },
// 	{
// 		$set: { 'links.url': req.body.url },
// 	},
// 	{
// 		$project: {
// 			links: {
// 				$filter: {
// 					input: '$links',
// 					cond: { $eq: ['$$this._id', new Types.ObjectId(req.body.idLink)] },
// 				},
// 			},
// 		},
// 	},
// 	{
// 		$replaceRoot: {
// 			newRoot: {
// 				$arrayElemAt: ['$links', 0],
// 			},
// 		},
// 	},
// ]).then((res: any) => {
// 	console.log(res);
// });
