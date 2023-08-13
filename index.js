require('dotenv').config();
const express = require('express')
const app = express()
const router = require('./configs/routers/app')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT
const DBURI = process.env.DBURI


mongoose.connect(DBURI)

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(PORT, ()=>{console.log('success', PORT)})