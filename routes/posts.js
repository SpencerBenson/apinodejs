const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

//routes


// GET POSTS
router.get('/',async (req, res) => {

    try{
        const posts = await Post.find().limit(10)
        res.status(200).json(posts)
    }catch(e){
        res.json({
            message: e
        })
    }
})

// ADD A POST
router.post('/',async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const savedPost = await post.save()
        res.status(200).json(savedPost)
    } catch(e){
        res.json({message: e})
    }
})

//SPECIFIC POST
router.get('/:postId',async (req,res) => {
    try{
        const postId = req.params.postId
        const post = await Post.findById(postId)
        res.json(post)
    }catch(err){
        res.json({
            message: err
        })
    }

})
//DELETE POST
router.delete('/:postId',async (req,res) => {
    try{
        const postId = req.params.postId
        const removedPost = await Post.remove({"_id": postId})
        res.json(removedPost)
    }catch(err){
        res.json({
            message: err
        })
    }

})

//PATCH POST
router.patch('/:postId',async (req,res) => {
    try{
        const postId = req.params.postId
        const updatedPost = await Post.updateOne({"_id": postId}, {$set:{
            "title": req.body.title,
            "description": req.body.description
        }

        })
        res.json(updatedPost)
    }catch(err){
        res.json({
            message: err
        })
    }

})

module.exports = router
