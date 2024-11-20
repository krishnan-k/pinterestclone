import express from "express";

import * as imageController from "../controllers/imageController";
const router = express.Router();

// POST request to create an image
router.post('/imagespost', imageController.createImage);
router.get("/imagesget", imageController.getAllImages);
router.get("/imagesget/:id", imageController.getImageById);
router.put("/imagesupdate/:id", imageController.updateImage);
router.delete("/imagesdelete/:id", imageController.deleteImage);

export default router;
