import express from 'express';

import { getBlogs, getBlogBySearch, createBlog, updateBlog, deleteBlog, likeBlog } from '../controllers/blogs.js';
import { get } from 'mongoose';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/' , getBlogs);
router.get('/search',getBlogBySearch)
router.post('/' , auth, createBlog);
router.patch('/:id' , auth, updateBlog);
router.delete('/:id' , auth, deleteBlog);
router.patch('/:id/likeBlog' , auth, likeBlog);

export default router;