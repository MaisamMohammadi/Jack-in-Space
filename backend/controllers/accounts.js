// import { UserValidate } from '../validators/validators.js'
import path from 'path'
import fs from 'fs'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)
const dirname = path.resolve()
const data = JSON.parse(fs.readFileSync(path.join(dirname, './models/data.json')))
const users = data.users

const verifyAccount = (username, password) => {
  const user = users.find((user) => user.username === username)
  // password = bcrypt.hashSync(password, salt)
  if (!user) return { username: false, password: false }
  // if (user.password !== password) return { username: true, password: false }
  if (!bcrypt.compareSync(password, user.password)) return { username: true, password: false }
  return { username: true, password: true }
}

const fetchAccounts = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(200).json(users)
  } else {
    const accountVerificationResult = verifyAccount(username, password)
    if (!accountVerificationResult.username && !accountVerificationResult.password) {
      res.status(404).json({
        message:
          'Could not log in because the user was not found. If you typed your username correctly, then you may not have an account yet. Please register by clicking the "register" button.'
      })
    } else if (accountVerificationResult.username && !accountVerificationResult.password) {
      res.status(401).json({
        message:
          'Could not log in because given password is incorrect. Please make sure you typed your password correctly, and then try again.'
      })
    } else if (accountVerificationResult.username && accountVerificationResult.password) {
      res.status(200).json(users.find((user) => user.username === username))
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred while trying to log in. Please try again later.'
      })
    }
    // switch (accountVerificationResult) {
    //   case { username: false, password: false }:
    //     res.status(404).json({
    //       message:
    //         'Could not log in because the user was not found. If you typed your username correctly, then you may not have an account yet. Please register by clicking the "register" button.'
    //     })
    //     break
    //   case { username: true, password: false }:
    //     res.status(401).json({
    //       message:
    //         'Could not log in because given password is incorrect. Please make sure you typed your password correctly, and then try again.'
    //     })
    //     break
    //   case { username: true, password: true }:
    //     res.status(200).json(users.find((user) => user.username === username))
    //     break
    //   default:
    //     res.status(500).json({
    //       message: 'An unexpected error occurred while trying to log in. Please try again later.'
    //     })
    //     break
    // }
  }
}

const addAccount = (req, res) => {
  const { username, password, birthdate } = req.body
  const age = new Date().getFullYear() - new Date(birthdate).getFullYear()
  const user = users.find((user) => user.username === username)
  if (!username || !password || !birthdate) {
    res.status(400).json({
      message:
        'Could not add account because one or more required fields were not provided. Please make sure you provided a username, password, and your birthdate.'
    })
    return
  }
  if (user) {
    res.status(409).json({
      message:
        'Could not add account because this username is already taken. Please choose a different username.'
    })
    return
  }
  if (age < 8) {
    res.status(403).json({
      message:
        'Could not add account because you are too young to play this game. You must be at least 8 years old to play.'
    })
    return
  }
  const newUser = {
    id: users.length + 1,
    username,
    password: bcrypt.hashSync(password, salt),
    birthdate,
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
  const id = Number(req.params.id)
  const { username, password, age, highscore, coins, skins } = req.body
  const user = users.find((user) => user.id === id)
  // const user = users.find((user) => {
  //   console.log(`${typeof user.id} === ${typeof id}`, user.id === id)
  //   return user.id === id
  // })
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
  const id = Number(req.params.id)
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
