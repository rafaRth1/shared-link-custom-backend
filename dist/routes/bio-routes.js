"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const check_auth_js_1 = __importDefault(require("../middleware/check-auth.js"));
const bio_controller_js_1 = require("../controllers/bio-controller.js");
const router = express_1.default.Router();
router.put('/edit-bio', check_auth_js_1.default, bio_controller_js_1.editValuesBio);
router.post('/add-link', check_auth_js_1.default, bio_controller_js_1.addLinkBio);
router.post('/edit-link', check_auth_js_1.default, bio_controller_js_1.editLinkBio);
router.put('/reorder-link', bio_controller_js_1.reorderPositionLinksBio);
// router.post('/updload-delete', handleDestroyImage);
// router.route('/:id').put(checkAuth, editValuesBio).post(checkAuth, deleteLinkBio);
exports.default = router;
//# sourceMappingURL=bio-routes.js.map