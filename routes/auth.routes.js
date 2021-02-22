const { Router } = require('express');
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router();
require('dotenv').config();

router.post(
  '/register',
  [
    check('email', `Некорректный email`).isEmail(),
    check(`password`, 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {

    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: `Некорректные данные при регистрации`
        })
      }
      const { email, password, position } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }

      const user = new User({ 
        email, 
        password: password,
        name: '',
        surname: '',
        position,
        phone: null,
        patronymic: '',
        date: new Date(),
        access: false,
        admin: false,
      })

      await user.save()

      res.status(201).json({ message: `Пользователь создан` })

    } catch (e) {
      res.status(500).json({ message: "Что то пошло не так попробуйте снова" })
    }
  })

router.post(
  '/login',
  [
    check('email', `Введите корректный email`).isEmail(),
    check(`password`, 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: `Некорректные данные при входе в систему`,
        })
      }

      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: `Пользователь не найден` })
      }

      const isMatch = (password === user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова'
        })
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.jwtSecret,
        { expiresIn: '1h' }
      )

      res.json({ 
        token, 
        userId: user.id, 
        password
      })

    } catch (e) {
      res.status(500).json({ message: "Что то пошло не так" })
    }
  })

  router.post(
    '/recovery',
    [
      check('email', `Введите корректный email`).isEmail()
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: `Некорректные данные при входе в систему`,
          })
        }
  
        const { email } = req.body
        const user = await User.findOne({ email })
  
        if (!user) {
          return res.status(400).json({ message: `Пользователь не найден` })
        }
        res.json({ email })

      } catch (e) {
        res.status(500).json({ message: "Что то пошло не так" })
      }
    })

router.get(
      '/get',
      async (req, res) => {
        try {
          const user = await User.find({});
    
          res.json({user})
    
        } catch (e) {
          res.status(500).json({ message: "Что то пошло не так" })
        }
      })

 
router.put(
  '/users',
  async (req, res) => {
  try {
    req.body.forEach(async (item) => {
      await User.updateOne(
        {_id: item.id},
        { access: item.access }
      );
    })
    res.send();
  } catch (err) {
    res.json({ message: err });
  }
})

router
  .get( 
    '/:id',
    async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.send(user);
    } catch (err) {
      res.json({ message: err });
    }
  })
  
router.put(
  '/:id',
  async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
})


module.exports = router