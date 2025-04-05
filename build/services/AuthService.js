"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    async register(user) {
        const response = {
            data: user,
            message: "OK",
            success: true
        };
        return response;
    }
    async login(user) {
        const response = {
            data: user,
            message: "OK",
            success: true
        };
        return response;
    }
}
exports.default = AuthService;
