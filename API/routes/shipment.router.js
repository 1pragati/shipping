import express from 'express';
const router = express.Router();

//to link controller
import * as ShipmentController from '../controller/shipment.controller.js'; 

router.post("/save",ShipmentController.save);

router.get("/fetch",ShipmentController.fetch);

router.delete("/delete",ShipmentController.deleteCategory);

router.patch("/update",ShipmentController.updateCategory);

export default router;