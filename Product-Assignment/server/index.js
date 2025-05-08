const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const router = require('./routes/product.routes')
const cors = require('cors')
dotenv.config()
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

app.use(cors({
    origin:'*'
}))
app.get('/', (req, res) => {
    res.send('Hello World!')
})
connectDB()
app.use('/tasks',router)

app.listen(port, () => {
    console.log(`Product app listening on port ${port}`)
})

module.exports = app;