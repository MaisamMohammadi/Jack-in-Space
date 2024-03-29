import query from '../../db/index.js'

const dbFetchAccounts = async () => {
  const sql = 'SELECT * FROM accounts'
  const accounts = await query(sql)
  return accounts
}

const dbFetchAccount = async (idOrUsername) => {
  const id = Number(idOrUsername)
  const sql = isNaN(id)
    ? 'SELECT * FROM accounts WHERE username = ?'
    : 'SELECT * FROM accounts WHERE id = ?'
  const account = await query(sql, [idOrUsername])
  return account[0]
}

const dbAddAccount = async (username, password, birthdate, salt) => {
  let age = new Date().getFullYear() - new Date(birthdate).getFullYear()
  if (age < 8) return
  const birthdayHasPassed =
    new Date().getMonth() > new Date(birthdate).getMonth() ||
    (new Date().getMonth() === new Date(birthdate).getMonth() &&
      new Date().getDate() >= new Date(birthdate).getDate())
  if (!birthdayHasPassed) age -= 1
  const sql =
    'INSERT INTO accounts (username, password, salt, birthdate, age, highscore, coins, skinShip, skinLaser) VALUES (?, ?, ?, ?, ?, 0, 0, 0, 0) RETURNING *'
  const account = await query(sql, [username, password, salt, birthdate, age])
  return account[0]
}

const dbUpdateAccountUsername = async (id, username) => {
  const sql = 'UPDATE accounts SET username = ? WHERE id = ? RETURNING *'
  const account = await query(sql, [username, id])
  return account
}

const dbUpdateAccountPassword = async (id, password) => {
  const sql = 'UPDATE accounts SET password = ? WHERE id = ? RETURNING *'
  const account = await query(sql, [password, id])
  return account
}

const dbUpdateAccountBirthdate = async (id, birthdate) => {
  let age = new Date().getFullYear() - new Date(birthdate).getFullYear()
  if (age < 8) return
  const birthdayHasPassed =
    new Date().getMonth() > new Date(birthdate).getMonth() ||
    (new Date().getMonth() === new Date(birthdate).getMonth() &&
      new Date().getDate() >= new Date(birthdate).getDate())
  if (!birthdayHasPassed) age -= 1
  const sql =
    'UPDATE accounts SET birthdate = ?, age = ? WHERE id = ? RETURNING *'
  const account = await query(sql, [birthdate, age, id])
  return account
}

const dbUpdateAccountHighscore = async (id, highscore) => {
  const sql = 'UPDATE accounts SET highscore = ? WHERE id = ? RETURNING *'
  const account = await query(sql, [highscore, id])
  return account
}

const dbUpdateAccountCoins = async (id, coins) => {
  const sql = 'UPDATE accounts SET coins = ? WHERE id = ? RETURNING *'
  const account = await query(sql, [coins, id])
  console.log('account', account)
  return account
}

const dbUpdateAccountSkinShip = async (id, skinShip) => {
  const sql = 'UPDATE accounts SET skinShip = ? WHERE id = ? RETURNING *'
  const account = await query(sql, [skinShip, id])
  return account
}

const dbUpdateAccountSkinLaser = async (id, skinLaser) => {
  const sql = 'UPDATE accounts SET skinLaser = ? WHERE id = ? RETURNING *'
  const account = await query(sql, [skinLaser, id])
  return account
}

const dbDeleteAccount = async (id) => {
  const sql = 'DELETE FROM accounts WHERE id = ? RETURNING *'
  const account = await query(sql, [id])
  return account
}

export {
  dbFetchAccounts,
  dbFetchAccount,
  dbAddAccount,
  dbDeleteAccount,
  dbUpdateAccountUsername,
  dbUpdateAccountPassword,
  dbUpdateAccountBirthdate,
  dbUpdateAccountHighscore,
  dbUpdateAccountCoins,
  dbUpdateAccountSkinShip,
  dbUpdateAccountSkinLaser
}
