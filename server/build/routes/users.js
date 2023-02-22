"use strict";
// import bcrypt from 'bcrypt';
// import express from 'express';
// const userRouter = express.Router();
// const User = require('../models/user')
// userRouter.post('/', async (request, response) => {
//   const { username, name, password } = request.body
//   // Add additional tests to check if it consists only of permitted characters
//   const existingUser = await User.findOne({ username })
//   if (username.length < 3) {
//     return response.status(400).json({
//       error: 'username must be at least 3 characters'
//     })
//   } else if (password.length < 3) {
//     return response.status(400).json({
//       error: 'password must be at least 3 characters'
//     })
//   } else if (existingUser) {
//     return response.status(400).json({
//       error: 'username must be unique'
//     })
//   }
//   const saltRounds = 10
//   const passwordHash = await bcrypt.hash(password, saltRounds)
//   const user = new User({
//     username,
//     name,
//     passwordHash
//   })
//   const savedUser = await user.save()
//   response.status(201).json(savedUser)
// })
// userRouter.get('/', async (request, response) => {
//   const users = await User
//     .find({})
//     .populate('blog', 'title author url likes')
//   response.json(users)
// })
// module.exports = userRouter
