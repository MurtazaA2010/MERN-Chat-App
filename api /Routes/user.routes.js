import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsers } from "../controller/users.js";

const Router = express.Router();

Router.get('/', protectRoute, getUsers);

export default Router;