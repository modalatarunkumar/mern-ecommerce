import  CustomError  from "../service/CustomError.js";
import  asyncHandler from "../service/asyncHandler.js";
import Coupon from "../models/coupon.schema.js";


export const createCoupon = asyncHandler(async (req, res) => {
    const {code, discount, active} = req.body
    if(!code || !discount) {
        throw new CustomError("Please fill all fields", 400)
        
    }

    // check if coupon already exists
    const existingCoupon = await Coupon.findOne({code})
    if(existingCoupon){
        throw new CustomError("Coupon already exists")
    }
    const coupon = await Coupon.create({
        code,
        discount,
        active
    });

    if(!coupon){
        throw new CustomError("Coupon cannot created", 400);
    }
    res.status(200).json({
        success: true,
        message: "coupon created successfully",
        coupon
    })

})

export const disableCoupon = asyncHandler(async (req, res) => {
    const {id:couponId} = req.params;

    if(!couponId){
        throw new CustomError("Please provide and id to disable", 400);
    }
    const coupon = await Coupon.findById(couponId);
    if(!coupon){
        throw new CustomError("Coupon not found", 400);
    }
    if(!coupon.active){
        throw new CustomError("This coupon is already disabled", 400);
    }
    
    // coupon.set({active : false})
    coupon.active = false;
    await coupon.save()
    res.status(200).json({
        success: true,
        message: "this coupon is disabled successfully",
        coupon
    })

})


export const updateCoupon = asyncHandler(async (req, res) => {
    const {code, discount} = req.body
    const {id: couponId} = req.params

    if(!code && !discount){
        throw new CustomError("Please enter a name to update", 400);
    }
    const coupon = await Coupon.findByIdAndUpdate(couponId, {
        code,
        discount
    },
    {
        new:true,
        runValidators:true
    });
    if(!coupon){
        throw new CustomError("Deletion not possible", 400);
    }
    res.status(200).json({
        success: true,
        message: "update successfully",
        coupon
    });
})

export const getAllCoupon = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({})
    if(coupons.length == 0){
        throw new CustomError("No coupons found", 404);
    }
    res.status(200).json({
        success:true,
        coupons
    })
})