const express = require('express'); // Importing express
const mongoose = require('mongoose'); // Importing mongoose
const BlogMessage = require('../models/blogMessage.js'); // Importing the BlogMessage model

module.exports = {
    getBlogs: async (req, res) => {
        const { page } = req.query; // get the page from the request

        try {
            const LIMIT = 8; // set the limit to 8
            const startIndex = (Number(page) - 1) * LIMIT; // calculate the start index
            const total = await BlogMessage.countDocuments({}); // count the total number of blog messages

            const blogs = await BlogMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex); // find all the blog messages
            res.status(200).json({ data: blogs, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) }); // return the blog messages
        } catch (error) {
            res.status(404).json({ message: error.message }); // return error message
        }
    },

    getBlog: async (req, res) => {
        const { id } = req.params; // get the id from the request

        try {
            const blog = await BlogMessage.findById(id); // find the blog message
            res.status(200).json(blog); // return the blog message
        } catch (error) {
            res.status(404).json({ message: error.message }); // return error message
        }
    },

    getBlogBySearch: async (req, res) => {
        const { searchQuery, tags } = req.query; // get the search query and tags from the request
        try {
            const title = new RegExp(searchQuery, 'i'); // create a regular expression for the search query
            const blogMessages = await BlogMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] }); // find all the blog messages that match the search query or the tags

            res.json({ data: blogMessages }); // return the blog messages
        } catch (error) {
            res.status(404).json({ message: error.message }); // return error message
        }
    },

    createBlog: async (req, res) => {
        const blog = req.body; // get the body of the request
        const newBlog = new BlogMessage({ ...blog, creator: req.userId, createdAt: new Date().toISOString() }); // create a new blog message
        try {
            await newBlog.save(); // save the new blog message
            res.status(201).json(newBlog); // return the new blog message
        } catch (error) {
            res.status(409).json({ message: error.message }); // return error message
        }
    },

    updateBlog: async (req, res) => {
        const { id: _id } = req.params; // get the id of the request
        const blog = req.body; // get the body of the request

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id'); // check if the id is valid

        const updatedBlog = await BlogMessage.findByIdAndUpdate(_id, { ...blog, _id }, { new: true }); // update the blog message

        res.json(updatedBlog); // return the updated blog message
    },

    deleteBlog: async (req, res) => {
        const { id } = req.params; // get the id of the request

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No blog with that id'); // check if the id is valid

        await BlogMessage.findByIdAndDelete(id); // delete the blog message

        res.json({ message: 'Blog deleted successfully' }); // return message
    },

    likeBlog: async (req, res) => {
        const { id } = req.params; // get the id of the request

        if (!req.userId) return res.json({ message: "Unauthenticated" }); // check if the user is authenticated

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No blog with that id'); // check if the id is valid

        const blog = await BlogMessage.findById(id); // find the blog message
        const index = blog.likes.findIndex((id) => id === String(req.userId)); // check if the user has already liked the blog message

        if (index === -1) {
            blog.likes.push(req.userId); // add the user id to the likes array
        } else {
            blog.likes = blog.likes.filter((id) => id !== String(req.userId)); // remove the user id from the likes array
        }

        const updatedBlog = await BlogMessage.findByIdAndUpdate(id, blog, { new: true }); // update the blog message

        res.json(updatedBlog); // return the updated blog message
    },

    commentBlog : async (req, res) => {
        const { id } = req.params; // get the id of the request
        const { value } = req.body; // get the body of the request

        const blog = await BlogMessage.findById(id); // find the blog message

        blog.comments.push(value); // add the comment to the comments array

        const updatedBlog = await BlogMessage.findByIdAndUpdate(id, blog, { new: true }); // update the blog message

        res.json(updatedBlog); // return the updated blog message
    }
};
