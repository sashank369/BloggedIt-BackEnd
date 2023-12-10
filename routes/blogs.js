const express = require('express');

const { getBlogs, getBlog, getBlogBySearch, createBlog, updateBlog, deleteBlog, likeBlog } = require('../controllers/blogs.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.get('/' , getBlogs);
router.get('/search',getBlogBySearch)
router.get('/:id' , getBlog);
router.post('/' , auth, createBlog);
router.patch('/:id' , auth, updateBlog);
router.delete('/:id' , auth, deleteBlog);
router.patch('/:id/likeBlog' , auth, likeBlog);

module.exports = router;