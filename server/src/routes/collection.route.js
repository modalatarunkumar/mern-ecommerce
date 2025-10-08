import { Router } from "express";
import { createCollection, updateCollection, deleteCollection, getAllCollection } from "../controllers/collection.controller.js";

const router = Router()


router.post("/", createCollection)
router.put("/:id", updateCollection)
router.delete("/:id", deleteCollection)
router.get("/", getAllCollection)

export default router;