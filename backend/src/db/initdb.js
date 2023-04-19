import sqlite3 from 'sqlite3';
import fs from 'fs';

sqlite3.verbose();

// Here you can change the name of the database
const db = new sqlite3.Database('./data/movies.sqlite');

// Here will read the file db.sql and execute the queries
db.exec(fs.readFileSync('./data/db.sql', 'utf-8').toString(), (err) => {
  if (err) {
    console.log('Error creating tables', err);
  } else {
    console.log('Tables created');
  }
});
