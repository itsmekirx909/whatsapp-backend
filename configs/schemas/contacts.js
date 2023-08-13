const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
user: String,
img_src: String,
name: String,
number: String,
last_msg: String,
msgs: Array,
})

const contactModel = mongoose.model('contact', contactSchema)

module.exports = contactModel