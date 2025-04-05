"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService_1 = __importDefault(require("../services/UserService"));
const UserController = (0, express_1.Router)();
const userService = new UserService_1.default();
UserController.get("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await userService.getUser(id);
    res.json(response);
});
exports.default = UserController;
