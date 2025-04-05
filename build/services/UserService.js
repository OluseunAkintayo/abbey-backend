"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const User_1 = require("../entities/User");
const users = database_1.AppDataSource.getRepository(User_1.User);
class UserService {
    async getUser(username) {
        try {
            const user = await users.findOne({
                where: { email: username },
                select: ["id", "firstName", "lastName", "createdAt"]
            });
            const response = {
                data: user,
                message: "OK",
                success: true
            };
            return response;
        }
        catch (error) {
            return {
                data: error,
                message: "An error occurred",
                success: false
            };
        }
    }
}
exports.default = UserService;
