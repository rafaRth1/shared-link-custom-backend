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
exports.profileLink = exports.createNicknameUser = exports.profileUser = exports.authenticateUser = exports.registerUser = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const LinksBio_js_1 = __importDefault(require("../models/LinksBio.js"));
const generate_jwt_js_1 = __importDefault(require("../helpers/generate-jwt.js"));
const generate_id_js_1 = __importDefault(require("../helpers/generate-id.js"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nickName } = req.body;
    const userExiting = yield User_js_1.default.findOne({ email: email });
    if (userExiting) {
        const error = new Error('El usuario ya existe.');
        return res.status(400).json({ msg: error.message });
    }
    try {
        const user = new User_js_1.default(req.body);
        const linkBio = new LinksBio_js_1.default({
            name: nickName,
            title: nickName,
            description: '',
            imageProfile: '',
            bannerImage: '',
            links: [],
            user: user._id,
        });
        user.token = (0, generate_id_js_1.default)();
        user.confirm = true;
        yield linkBio.save();
        yield user.save();
        // Send Email confirm
        // emailRegister({
        // 	email: user.email,
        // 	name: user.name,
        // 	token: user.token,
        // });
        res.json({
            user: { email: user.email },
            msg: 'Usuario creado correctamente, revisa tu email para confirmar',
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.registerUser = registerUser;
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Comprobar si el usuario existe
    const user = yield User_js_1.default.findOne({ email: email });
    if (!user) {
        const error = new Error('User not existent');
        res.status(404).json({ msg: error.message });
    }
    // Comprobar si el usuario esta confirmado
    // if (!user.confirm) {
    // 	const error = new Error('Your account has not been confirmed');
    // 	res.status(403).json({ msg: error.message });
    // }
    // Comprobar su password
    if (yield (user === null || user === void 0 ? void 0 : user.checkPassword(password))) {
        // res.set('token', 'asdasdasasdzxc12323');
        // res.set('Access-Control-Expose-Headers', 'token');
        res.json({
            _id: user === null || user === void 0 ? void 0 : user._id,
            name: user === null || user === void 0 ? void 0 : user.firstName,
            lastname: user === null || user === void 0 ? void 0 : user.lastName,
            nickname: user === null || user === void 0 ? void 0 : user.nickName,
            email: user === null || user === void 0 ? void 0 : user.email,
            token: (0, generate_jwt_js_1.default)(user === null || user === void 0 ? void 0 : user._id),
        });
    }
    else {
        const error = new Error('El correo o contraseña son incorrectos');
        res.status(403).json({ msg: error.message });
    }
});
exports.authenticateUser = authenticateUser;
const profileUser = (req, res) => {
    res.json(req.user);
};
exports.profileUser = profileUser;
const createNicknameUser = (req, res) => {
    console.log(req.body);
    // const linksBio = new LinksBio({
    // 	name: '',
    // 	description: '',
    // 	imageProfile: '',
    // 	bannerImage: '',
    // 	links: [],
    // 	user: user._id,
    // });
    // await linksBio.save();
};
exports.createNicknameUser = createNicknameUser;
const profileLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname } = req.params;
    const dataLinkBio = yield LinksBio_js_1.default.findOne({ name: nickname });
    if (!dataLinkBio) {
        const error = new Error('Este usuario no existe');
        return res.status(404).json({ msg: error.message });
    }
    res.json(dataLinkBio);
});
exports.profileLink = profileLink;
//# sourceMappingURL=user-controller.js.map