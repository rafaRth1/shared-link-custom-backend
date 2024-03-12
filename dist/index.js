"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./config/db.js"));
const user_routes_js_1 = __importDefault(require("./routes/user-routes.js"));
const bio_routes_js_1 = __importDefault(require("./routes/bio-routes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_js_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 4000;
app.use('/user', user_routes_js_1.default);
app.use('/bio', bio_routes_js_1.default);
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});
