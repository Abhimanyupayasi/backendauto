import { Router } from "express";
import { login, logout, signup } from "../controllers/user.controller.js";
import app from "../app.js";
import { createAppoint, getAppoints } from "../controllers/appoint.controller.js";
const appointRouter = Router();


appointRouter.post('/create', createAppoint);
appointRouter.get('/get', getAppoints);


export default appointRouter;
