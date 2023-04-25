import query from '../../db/index.js'

const dbFetchAccounts = async () => {
  const sql = 'SELECT * FROM accounts'
  const accounts = await query(sql)
  return accounts
}

const dbFetchAccount = async (idOrUsername) => {
  const id = Number(idOrUsername)
  const sql = isNaN(id)
    ? 'SELECT * FROM accounts WHERE username = $1'
    : 'SELECT * FROM accounts WHERE id = $1'
  const account = await query(sql, [idOrUsername])
  return account[0]
}

const dbAddAccount = async (username, password, birthdate) => {
  const age = new Date().getFullYear() - new Date(birthdate).getFullYear()
  const sql =
    'INSERT INTO accounts (username, password, birthdate, age, 0, 0, 0, 0) VALUES ($1, $2, $3, $4) RETURNING *'
  const account = await query(sql, [username, password, birthdate, age])
  return account
}

const dbUpdateAccountUsername = async (id, username) => {
  const sql = 'UPDATE accounts SET username = $2 WHERE id = $1 RETURNING *'
  const account = await query(sql, [id, username])
  return account
}

const dbUpdateAccountPassword = async (id, password) => {
  const sql = 'UPDATE accounts SET password = $2 WHERE id = $1 RETURNING *'
  const account = await query(sql, [id, password])
  return account
}

const dbUpdateAccountBirthdate = async (id, birthdate) => {
  const age = new Date().getFullYear() - new Date(birthdate).getFullYear()
  const sql = 'UPDATE accounts SET birthdate = $2, age = $3 WHERE id = $1 RETURNING *'
  const account = await query(sql, [id, birthdate, age])
  return account
}

const dbUpdateAccountHighscore = async (id, highscore) => {
  const sql = 'UPDATE accounts SET highscore = $2 WHERE id = $1 RETURNING *'
  const account = await query(sql, [id, highscore])
  return account
}

const dbUpdateAccountCoins = async (id, coins) => {
  const sql = 'UPDATE accounts SET coins = $2 WHERE id = $1 RETURNING *'
  const account = await query(sql, [id, coins])
  return account
}

const dbUpdateAccountSkinShip = async (id, skinShip) => {
  const sql = 'UPDATE accounts SET skinShip = $2 WHERE id = $1 RETURNING *'
  const account = await query(sql, [id, skinShip])
  return account
}

const dbUpdateAccountSkinLaser = async (id, skinLaser) => {
  const sql = 'UPDATE accounts SET skinLaser = $2 WHERE id = $1 RETURNING *'
  const account = await query(sql, [id, skinLaser])
  return account
}

const dbDeleteAccount = async (id) => {
  const sql = 'DELETE FROM accounts WHERE id = $1 RETURNING *'
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
