"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateID = () => {
    const random = Math.random().toString(32).substring(2);
    const date = Date.now().toString(32);
    return random + date;
};
exports.default = generateID;
