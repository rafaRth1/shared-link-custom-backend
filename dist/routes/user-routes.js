"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_js_1 = require("../controllers/user-controller.js");
const check_auth_js_1 = __importDefault(require("../middleware/check-auth.js"));
const router = express_1.default.Router();
router.post('/', user_controller_js_1.registerUser);
router.post('/login', user_controller_js_1.authenticateUser);
router.get('/profile-link/:nickname', user_controller_js_1.profileLink);
router.get('/perfil', check_auth_js_1.default, user_controller_js_1.profileUser);
// router.post('/create-nickname', createNicknameUser);
exports.default = router;
//# sourceMappingURL=user-routes.js.map