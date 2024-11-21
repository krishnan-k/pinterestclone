import express from "express";

import * as imageController from "../controllers/imageController";
const router = express.Router();

// router request
router.post('/imagespost', imageController.createImage);
router.get("/imagesget", imageController.getAllImages);
router.get("/imagesget/:id", imageController.getImageById);
router.put("/imagesupdate/:id", imageController.updateImage);
router.delete("/imagesdelete/:id", imageController.deleteImage);
router.post("/imagestag/:id/tags", imageController.addTag);
router.get("/imagestagget/:id/tags", imageController.getTags);
router.get("/imagesget", imageController.getAllImages);

export default router;
