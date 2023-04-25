import sqlite from 'sqlite3'
import util from 'util'

sqlite.verbose()

const db = new sqlite.Database('./data/accounts.sqlite', sqlite.OPEN_READWRITE)
const query = util.promisify(db.all).bind(db)

export default query
