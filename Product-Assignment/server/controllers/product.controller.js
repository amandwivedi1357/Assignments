const Task = require("../model/product.model");

const createTask = async(req,res)=>{
    try{
        const task = await Task.create(req.body)
        res.status(201).json(task)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getTasks = async(req,res)=>{
    try{
        const tasks = await Task.find()
        res.status(200).json(tasks)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const updateTask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(task)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const deleteTask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        res.status(200).json(task)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getTaskById = async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id)
        res.status(200).json(task)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const insertMultipleProducts = async(req,res)=>{
try {
    const data = req.body;
    if(!Array.isArray(data)){
        return res.status(400).json({error:"Invalid data format: Expected an array of products."}) 
    }
    const insertedData = await Task.insertMany(data); 
    res.status(201).json({message:"Products posted successfully", insertedData}) 
} catch (error) {
    console.error("Error inserting multiple products:", error);
    res.status(500).json({error:"Failed to insert products", details: error.message})
}
}

module.exports = {createTask,getTasks,updateTask,deleteTask,getTaskById,insertMultipleProducts};