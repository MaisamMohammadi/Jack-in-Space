// import { UserValidate } from '../validators/validators.js'
import path from 'path'
import fs from 'fs'

const dirname = path.resolve()
const data = JSON.parse(fs.readFileSync(path.join(dirname, './models/data.json')))
const users = data.users

const fetchAccounts = (req, res) => {
  const { username, password } = req.query
  if (!username.trim() || !password.trim()) {
    res.status(200).json(users)
  } else {
    const user = users.find((user) => user.username === username)
    if (!user) {
      res.status(404).json({
        message:
          'Could not log in because the user was not found. If you typed your username correctly, then you may not have an account yet. Please register by clicking the "register" button.'
      })
      return
    }
    if (user.password !== password) {
      res.status(401).json({
        message:
          'Could not log in because given password is incorrect. Please make sure you typed your password correctly, and then try again.'
      })
      return
    }
    res.status(200).json(user)
  }
}

const addAccount = (req, res) => {
  const { username, password, age } = req.body
  const user = users.find((user) => user.username === username)
  if (user) {
    res.status(409).json({
      message: 'Could not add account because this username is already taken. Please choose a different username.'
    })
    return
  }
  const newUser = {
    id: users.length + 1,
    username,
    password,
    age,
    highscore: 0,
    coins: 0,
    skins: {
      ships: [],
      lasers: []
    }
  }
  users.push(newUser)
  fs.writeFileSync(path.join(dirname, './models/data.json'), JSON.stringify(data))
  res.status(201).json(newUser)
}

const updateAccount = (req, res) => {
  const { id } = req.params
  const { username, password, age, highscore, coins, skins } = req.body
  const user = users.find((user) => user.id === id)
  if (!user) {
    res.status(404).json({
      message: `Could not update user with ID ${id} because it was not found.`
    })
    return
  }
  if (username) user.username = username
  if (password) user.password = password
  if (age) user.age = age
  if (highscore) user.highscore = highscore
  if (coins) user.coins = coins
  // TODO: handle skins differently
  if (skins) user.skins = skins
  fs.writeFileSync(path.join(dirname, './models/data.json'), JSON.stringify(data))
  res.status(200).json(user)
}

const deleteAccount = (req, res) => {
  const { id } = req.params
  const user = users.find((user) => user.id === id)
  if (!user) {
    res.status(404).json({
      message: `Could not delete user with ID ${id} because it was not found.`
    })
    return
  }
  const index = users.indexOf(user)
  users.splice(index, 1)
  fs.writeFileSync(path.join(dirname, './models/data.json'), JSON.stringify(data))
  res.status(200).json({
    message: `User with ID ${id} deleted.`
  })
}

export { fetchAccounts, addAccount, updateAccount, deleteAccount }
