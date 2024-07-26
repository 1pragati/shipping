import express from 'express';
const router = express.Router();

//to link controller
import * as BidController from '../controller/bid.controller.js'; 

router.post("/save",BidController.save);

router.get("/fetch",BidController.fetch);

router.delete("/delete",BidController.deleteUser);

router.patch("/update",BidController.updateUser);

export default router;