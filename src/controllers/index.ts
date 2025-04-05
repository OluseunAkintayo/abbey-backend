import { Router } from "express";
import UserController from "./UserController";
import AuthController from "./AuthController";
const IndexController = Router();

IndexController.use("/users", UserController);
IndexController.use("/auth", AuthController);

export default IndexController;
