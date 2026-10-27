import express from "express";
import { addstore, showstore, editstore, deletestore } from "../controller/store.js";
import { addservices, showservices, editservices, deleteservices } from "../controller/services.js";
import {
    addmanger,
    editmanger,
    deletemanger,
    showmanger
} from "../controller/manger.js";
import { addproduct, editproduct, deleteproduct, showproduct } from "../controller/product.js";
import { addcategories, showcategories, editcategories, deletecategories } from "../controller/categories.js";
import { addpopular, showpopular, deletepopular, editpopular } from "../controller/popuar.js";
import { addorder, showorder, deleteorder } from "../controller/order.js";
import { addpayment, showinvoices, showallinvoices } from "../controller/payment.js";

import upload from "../multer/upload.js";
const routingpos = express.Router();
// start store
routingpos.post("/addstore", upload.single("image"), addstore);
routingpos.get("/showstore", showstore);
routingpos.delete("/deletestore/:id", deletestore);
routingpos.put("/editstore/:id", upload.single("image"), editstore);
// start services
routingpos.post("/addservices", addservices);
routingpos.get("/showservices", showservices);
routingpos.delete("/deleteservices/:id", deleteservices);
routingpos.put("/editservices/:id", editservices);
// start manger
routingpos.post("/addmanger", upload.single("image"), addmanger);
routingpos.get("/showmanger", showmanger);
routingpos.delete("/deletemanger/:id", deletemanger);
routingpos.put("/editmanger/:id", upload.single("image"), editmanger);
// start categorey
routingpos.post("/addcategorey", upload.single("image"), addcategories);
routingpos.get("/showcategorey", showcategories);
routingpos.delete("/deletecategorey/:id", deletecategories);
routingpos.put("/editcategorey/:id", upload.single("image"), editcategories);
//  add product
routingpos.post("/addproduct", upload.single("image"), addproduct);
routingpos.get("/showproduct", showproduct);
routingpos.delete("/deleteproduct/:id", deleteproduct);
routingpos.put("/editcproduct/:id", upload.single("image"), editproduct);
//  add popular  product
routingpos.post("/addpopular", upload.single("image"), addpopular);
routingpos.get("/showpopular", showpopular);
routingpos.delete("/deletepopular/:id", deletepopular);
routingpos.put("/editpopular/:id", upload.single("image"), editpopular);
//  add order
routingpos.post("/addorder", addorder);
routingpos.get("/showorder", showorder);
routingpos.delete("/deleteorder/:id", deleteorder);
routingpos.post("/addpayment", addpayment);
routingpos.get("/showinvoices", showinvoices);
routingpos.get("/showallinvoices", showallinvoices);
export default routingpos