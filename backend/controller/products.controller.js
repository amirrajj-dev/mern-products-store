import productsModel from "../models/product.model.js";
import { isValidObjectId } from 'mongoose'

const getProducts = async (req , res)=>{
    try {
        const products = await productsModel.find({})
        res.status(200).json({success : true , data : products})
    } catch (error) {
        res.status(500).json({success : false , message : error.message})
    }
}

const getOneProduct = async (req , res)=>{
    try {
        const id =req.params.id
        if (!isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid product id'})
        }
        const product = await productsModel.findById(id)
        if (!product){
            return res.status(404).json({success : false , message : 'Product not found'})
        }
        res.status(200).json({success : true , data : product})
    } catch (error) {
        res.status(500).json({success : false , message : error.message})
    }
}

const createProduct = async (req , res)=>{
    
    const {name , price , image} = req.body
    try {
        if (!name || !price || !image){
            return res.status(400).json({success : false , message : 'Please provide all fields'})
        }
        const product = await productsModel.create({name , price , image})
        res.status(201).json({success : true , message : 'Product created successfully' , data : product})
    } catch (error) {
        res.status(500).json({success : false , message : error.message})
    }
}

const updateProduct = async (req , res)=>{
    try {
        const {id} = req.params
        const {name, price, image} = req.body
        if (!isValidObjectId(id)){
            return res.status(400).json({ success: false, message: 'Invalid product id'})
        }
        if (!name || !price || !image){
            return res.status(400).json({success : false , message : 'Please provide all fields'})
        }
        const updatedProduct = await productsModel.findByIdAndUpdate(id , {
            $set : {
                name,
                price,
                image
            }
        } , {new : true})
        res.status(200).json({success : true , message : 'Product updated successfully' , data: updatedProduct})
    } catch (error) {
        res.status(500).json({success : false , message : error.message})
    }
}

const deleteProduct = async (req , res)=>{
    try {
        const {id} = req.params
        if (!isValidObjectId(id)){
            return res.status(400).json({ success: false, message: 'Invalid product id'})
        }
        await productsModel.findByIdAndDelete(id)
        res.status(200).json({success : true , message : 'Product deleted successfully'})
    } catch (error) {
        res.status(500).json({success : false , message : error.message})
    }
}

export {getOneProduct , getProducts , createProduct , updateProduct , deleteProduct};