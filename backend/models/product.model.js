import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    }  ,
    price : {
        type : Number ,
        required : true
    } ,
    image : {
        type : String ,
        required : true
    } ,
},
{
    timestamps : true
})

const productsModel = mongoose.models.product ||mongoose.model('product' , schema)

export default productsModel;