import express from "express";
import { login, Register, deleteusermodel, showuser } from "../controller/user.js";
const Approuter = express.Router();
// login and regsiter
Approuter.post("/login", login);
Approuter.post("/register", Register);
// user login
Approuter.get("/showuser", showuser);
Approuter.delete("/deleteuser/:id", deleteusermodel);
export default Approuter