const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { 
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: { 
        type: Date,
        default: new Date()
    },

});

const BlogMessage = mongoose.model('BlogMessage', blogSchema);

module.exports = BlogMessage;