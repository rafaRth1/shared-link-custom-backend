"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_js_1 = __importDefault(require("./routes/user-routes.js"));
const bio_routes_js_1 = __importDefault(require("./routes/bio-routes.js"));
const db_js_1 = __importDefault(require("./config/db.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_js_1.default)();
// Config Cors
const whitelist = [
    process.env.FRONTEND_URL_PRD,
    process.env.FRONTEND_URL_DEV,
    process.env.FRONTEND_URL_PRD_TEST,
];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Error de cors'));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
// Directorio Publico
app.use(express_1.default.static('/dist/public'));
const PORT = process.env.PORT || 4000;
app.use('/user', user_routes_js_1.default);
app.use('/bio', bio_routes_js_1.default);
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/public/index.html');
});
app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map