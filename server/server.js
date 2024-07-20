const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes')
const {notFound, errorHandler} = require('./middleware/errorHandler')

const app = express()
dotenv.config();
connectDB()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("API is running!")
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server started on Port ${PORT}`));