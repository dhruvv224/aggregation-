const express=require('express')
const item=require('../Models/ItemModel.js')
const createItem=async(req,res)=>{
    try {
        
        const{name,price,description}=req.body
        const newItem=await item.create({name,price,description})
        res.status(200).json({
            message:"all good",
            newItem
        }
        )
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create item',
            error: error.message,
        
        })

    }

}    
const getAllItems = async (req, res) => {
    try {
        const items = await item.find(); // Fetch all documents from the "items" collection
        res.status(200).json({
            message: 'Items retrieved successfully',
            items,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve items',
            error: error.message,
        });
    }
};
const getOneitem=async(req,res)=>{
    try {
        const {id}=req.params
        const newItem=await item.findById(id)
        res.status(200).json({
            message:'hello',
            newItem
            
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message:error.message,
            
        })
        
    }
}
// update by id
const UpdatebyId=async(req,res)=>{
    try {
        const {id} =req.params
        const newData=req.body
        const newItem=await item.findByIdAndUpdate(id,newData,
            {new:true}
        )
        if(!newItem)
        {
            res.status(500).json(
                {
                    message:"item not found",

                }
            )


        }
        res.status(200).json({
            message:"updated succesfully",
            newItem
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message:error.message
        })
    }
}
// unfixed 
const findByName = async (req, res) => {
    try {
        const { name } = req.query; // Extract 'name' from query parameters

        // Validate input
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Name query parameter is required and cannot be empty.' });
        }

        // Search for items using a case-insensitive regex
        const items = await item.find({ name: { $regex: name, $options: 'i' } });

        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found with the given name.' });
        }

        res.status(200).json({
            message: 'Items retrieved successfully',
            items,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve items',
            error: error.message,
        });
    }
};
// delete by id
const DeleteByid=async(req,res)=>
{
   try {
    const {id}=req.params
    const deleteRec=await item.findByIdAndDelete(id)
    if(!deleteRec)
    {
        res.send(400).json({
            message:"item is not deleted"
        })
    }
    res.send(200).json({
        message:"item deleted successfully"
        
    })
    
   } catch (error) {
    res.status(400).json({
        message:error.message
    })
    
   }


}
// aggregation 
const aggregation=async(req,res)=>{
    try {
        const aggregationResult = await item.aggregate([
            {
                $facet: {
                    totalPrice: [
                        { $group: { _id: null, total: { $sum: "$price" } } },
                        { $project: { _id: 0, total: 1 } },
                    ],
                    averagePrice: [
                        { $group: { _id: null, average: { $avg: "$price" } } },
                        { $project: { _id: 0, average: 1 } },
                    ],
                    priceRanges: [
                        {
                            $bucket: {
                                groupBy: "$price",
                                boundaries: [0, 100, 500, 1000, 5000],
                                default: "Other",
                                output: {
                                    range: { $first: "$_id" }, // Ensures range is defined for each bucket
                                    count: { $sum: 1 },
                                    items: { $push: "$name" },
                                },
                            },
                        },
                    ],
                    mostExpensiveItem: [
                        { $sort: { price: -1 } },
                        { $limit: 1 },
                        { $project: { _id: 0, name: 1, price: 1 } },
                    ],
                    leastExpensiveItem: [
                        { $sort: { price: 1 } },
                        { $limit: 1 },
                        { $project: { _id: 0, name: 1, price: 1 } },
                    ],
                },
            },
        ]);

        res.status(200).json({
            message: "Aggregation results fetched successfully",
            result: aggregationResult[0],
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch aggregation results",
            error: error.message,
        });
    }
}

module.exports = {
    createItem,
    getAllItems,
    getOneitem,
    UpdatebyId,
    findByName,
    DeleteByid,
    aggregation

};
