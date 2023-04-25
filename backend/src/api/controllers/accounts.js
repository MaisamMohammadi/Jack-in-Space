import * as model from '../models/accounts.js'
import bcrypt from 'bcryptjs'

const isNullOrWhitespace = (str) => {
  return !str || !str.trim()
}

const checkIfUsernameTaken = async (username) => {
  const accounts = await model.dbFetchAccounts()
  const account = accounts.find((account) => account.username === username)
  return account !== undefined
}

const fetchAccounts = async (req, res) => {
  const accounts = await model.dbFetchAccounts()
  res.status(200).json(accounts)
}

const fetchAccount = async (req, res) => {
  const { id } = req.params
  const account = await model.dbFetchAccount(id)
  res.status(200).json(account)
}

const authenticateAccount = async (username, password) => {
  const user = await model.dbFetchAccount(username)
  if (!user) return { username: false, password: false }
  if (!bcrypt.compareSync(password, user.password)) return { username: true, password: false }
  return { username: true, password: true }
}

const addAccount = async (req, res) => {
  const { username, password, birthdate } = req.body
  if (await checkIfUsernameTaken(username)) {
    res.status(409).json({ message: 'Username already taken' })
    return
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const account = await model.dbAddAccount(username, hashedPassword, birthdate)
  res.status(201).json(account)
}

const updateAccount = async (req, res) => {
  const { id, method } = req.params
  let result
  switch (method) {
    case 'username':
      result = await updateAccountUsername(id, req.body)
      break
    case 'password':
      result = await updateAccountPassword(id, req.body)
      break
    case 'birthdate':
      result = await updateAccountBirthdate(id, req.body)
      break
    case 'highscore':
      result = await updateAccountHighscore(id, req.body)
      break
    case 'coins':
      result = await updateAccountCoins(id, req.body)
      break
    case 'skinShip':
      result = await updateAccountSkinShip(id, req.body)
      break
    case 'skinLaser':
      result = await updateAccountSkinLaser(id, req.body)
      break
    default:
      res.status(400).json({ message: 'Invalid method' })
  }
  if (result.jackIsLost) {
    res.status(result.status).json({ message: result.message })
    return
  }
  res.status(200).json(result)
}

const updateAccountUsername = async (id, requestBody) => {
  const { username } = requestBody
  if (isNullOrWhitespace(username)) {
    return { jackIsLost: true, status: 400, message: 'Supplied data (username) is empty' }
  }
  if (await checkIfUsernameTaken(username)) {
    return { jackIsLost: true, status: 409, message: 'Username already taken' }
  }
  const account = await model.dbUpdateAccountUsername(id, username)
  return account
}

const updateAccountPassword = async (id, requestBody) => {
  const { username, password, newPassword } = requestBody
  if (
    isNullOrWhitespace(username) ||
    isNullOrWhitespace(password) ||
    isNullOrWhitespace(newPassword)
  ) {
    return { jackIsLost: true, status: 400, message: 'Supplied data (username or password or newPassword) is empty' }
  }
  const authRes = await authenticateAccount(username, password)
  if (!authRes.username) {
    return { jackIsLost: true, status: 404, message: 'Username not found' }
  }
  if (!authRes.password) {
    return { jackIsLost: true, status: 401, message: 'Incorrect password' }
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newPassword, salt)
  const account = await model.dbUpdateAccountPassword(id, hashedPassword)
  return account
}

const updateAccountBirthdate = async (id, requestBody) => {
  const { birthdate } = requestBody
  if (isNullOrWhitespace(birthdate)) {
    return { jackIsLost: true, status: 400, message: 'Supplied data (birthdate) is empty' }
  }
  const account = await model.dbUpdateAccountBirthdate(id, birthdate)
  return account
}

const updateAccountHighscore = async (id, requestBody) => {
  const { highscore } = requestBody
  if (isNullOrWhitespace(highscore)) {
    return { jackIsLost: true, status: 400, message: 'Supplied data (highscore) is empty' }
  }
  if (isNaN(Number(highscore))) {
    return { jackIsLost: true, status: 400, message: 'Supplied data (highscore) is not a number' }
  }
  const account = await model.dbUpdateAccountHighscore(id, highscore)
  return account
}

const updateAccountCoins = async (id, requestBody) => {
  const { coins } = requestBody
  if (isNullOrWhitespace(coins)) {
    return { jackIsLost: true, status: 400, message: 'Supplied data (coins) is empty' }
  }
  if (isNaN(Number(coins))) {
    return { jackIsLost: true, status: 400, message: 'Supplied data (coins) is not a number' }
  }
  const account = await model.dbUpdateAccountCoins(id, coins)
  return account
}

const updateAccountSkinShip = async (id, requestBody) => {
  const { skinShip } = requestBody
  if (isNullOrWhitespace(skinShip)) {
    return { jackIsLost: true, status: 400, message: 'Supplied data (skinShip) is empty' }
  }
  if (isNaN(Number(skinShip))) {
    return { jackIsLost: true, status: 400, message: 'Supplied data (skinShip) is not a number' }
  }
  const account = await model.dbUpdateAccountSkinShip(id, skinShip)
  return account
}

const updateAccountSkinLaser = async (id, requestBody) => {
  const { skinLaser } = requestBody
  if (isNullOrWhitespace(skinLaser)) {
    return { jackIsLost: true, status: 400, message: 'Supplied data (skinLaser) is empty' }
  }
  if (isNaN(Number(skinLaser))) {
    return { jackIsLost: true, status: 400, message: 'Supplied data (skinLaser) is not a number' }
  }
  const account = await model.dbUpdateAccountSkinLaser(id, skinLaser)
  return account
}

const deleteAccount = async (req, res) => {
  const { id } = req.params
  const account = await model.dbDeleteAccount(id)
  res.status(200).json(account)
}

export {
  fetchAccounts,
  fetchAccount,
  authenticateAccount,
  addAccount,
  updateAccount,
  deleteAccount
}
