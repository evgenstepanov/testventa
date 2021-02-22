const { Router } = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const Post = require('../models/Post')
const router = Router();

router.post(
  '/add',
  async (req, res) => {

    try {
      const post = req.body

      const newPost = new Post(post)
      await newPost.save()
      res.status(201).json(newPost)

    } catch (e) {
      res.status(500).json({ message: "Что то пошло не так попробуйте снова" })
    }
  })

router.get(
    '/get',
    async (req, res) => {
      try {
        const post =  await Post.find({})
        res.json(post)
      } catch (e) {
        res.status(500).json({ message: "Что то пошло не так попробуйте снова" })
      }
    })

router.put(
  '/:id',
    async (req, res) => {
      try {
        const post = await Post.updateOne(
          { _id: req.params.id },
          { $set: req.body }
        );
        res.json(post);
      } catch (e) {
        res.status(500).json({ message: "Что то пошло не так попробуйте снова" })
      }
    })
  

module.exports = router