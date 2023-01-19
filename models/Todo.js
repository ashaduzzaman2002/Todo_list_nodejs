const mongoose = require('mongoose')
const {Schema} = mongoose

const todoSchema = new Schema({
    title: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('todo', todoSchema)