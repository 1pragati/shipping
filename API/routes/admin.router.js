import express from 'express';

const router=express.Router();

import * as adminController from '../controller/admin.controller.js';

router.post("/save",adminController.save);
router.post("/login",adminController.login);
router.get("/fetch",adminController.fetch);
router.delete("/delete",adminController.deleteUser);
router.patch("/update",adminController.updateUser);
export default router;

