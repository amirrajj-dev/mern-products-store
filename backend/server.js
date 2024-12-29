import express from 'express';
import dotenv from  'dotenv'
import productsRouter from './routes/product.routes.js' 
import connectToDb from './configs/db.js';
import path from 'path'
const app = express()

dotenv.config()
app.use(express.json())
app.use('/api/products' , productsRouter)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}


app.listen(process.env.PORT , async ()=>{
    await connectToDb()
    console.log(`listening on port ${process.env.PORT}`)
})