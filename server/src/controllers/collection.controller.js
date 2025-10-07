import Collection from "../models/collection.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/CustomError.js";

export const createCollection = asyncHandler(async (req, res) => {
    const {name} = req.body;

    if(!name){
        throw new CustomError("Collection name is required", 401);
    }
    // check if collection already exists
    const existingCollection = await Collection.findOne({name})
    if(existingCollection){
        throw new CustomError("Collection already exists");
    }

    const collection = await Collection.create({
        name
    })

    res.status(200).json({
        success: true,
        message: "Collection was created successfully",
        collection
    })
})

export const updateCollection = asyncHandler(async (req, res) => {
    const {name} = req.body;
    const {id: collectionId} = req.params;
    
    if(!name){
        throw new CustomError("Please enter a collection name to update");
    }
    let updatedCollection = await Collection.findByIdAndUpdate(collectionId, {
        name
    }, {
        new:true,
        runValidators:true,
    })

    if(!updatedCollection){
        throw new CustomError("Collection not found", 400);
    }


    res.status(200).json({
        success: true,
        message: "Collection updated successfully",
        updatedCollection
    })
})

export const deleteCollection = asyncHandler(async (req, res) =>{
    const {id:collectionId} = req.params;

    const collectionToDelete = await Collection.findById(collectionId)
    console.log("collection", collectionToDelete)
    if(!collectionToDelete){
        throw new CustomError("Collection not found", 400);
    }

    // await collectionToDelete.remove() remove method is deprecated
    await collectionToDelete.deleteOne();
    // also use await Collection.findByIdAndDelete(collectionId)
    
    res.status(200).json({
        success:true,
        message: "Collection deleted successfully"
    })
})

export const getAllCollection = asyncHandler(async (_req, res) => {
    const collections = await Collection.find({})
    
    if(!collections){
        throw new CustomError("there is no collections", 400);
    }
    res.status(200).json({
        success:true,
        collections
    })
})