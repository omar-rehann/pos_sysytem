import "dotenv/config"; // أول سطر خالص
import express from "express";
import cors from "cors";
import dbconnect from "./config/db.js";
import Approuter from "./routing/user.js";
import routingpos from "./routing/allrouting.js";
import imagekit from "./config/imagekit.js";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.json());
app.use(cors());
dbconnect();
app.get("/", (req, res) => {
    res.send("Hello to POS system");
});

const PORT = process.env.PORT
app.use("/possysytem/userAuth", Approuter);
app.use("/posystem/project", routingpos);
app.listen(PORT, () => {
    console.log(`Success API running on port ${PORT}`);
});