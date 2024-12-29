import mongoose from 'mongoose'

const connectToDb = async ()=>{
    if (mongoose.connections[0].readyState){
        console.log('already connected')
        return
    }
    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>console.log('connect to db succesfully 🤖✅'))
    } catch (error) {
        console.log('error connecting to db', error)
        process.exit(0)
    }
}

export default connectToDb;