import { Router } from "express";

import { createCoupon, updateCoupon, disableCoupon, getAllCoupon } from "../controllers/coupon.controller.js";


const router = Router()

router.post("/", createCoupon)
router.put("/:id", updateCoupon)
router.delete("/:id", disableCoupon)
router.get("/", getAllCoupon)

export default router;