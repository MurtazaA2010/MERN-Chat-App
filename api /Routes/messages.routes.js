import express from "express";
import { sendMessage , getMessage} from '../controller/message.js';
import protectRoute from "../middleware/protectRoute.js";

const Router = express.Router();

Router.get('/:id' ,protectRoute, getMessage)
Router.post('/send/:id' ,protectRoute, sendMessage)
export default Router; 