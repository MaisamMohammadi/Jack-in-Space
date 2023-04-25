-- here you can create your database tables and insert some data

DROP TABLE IF EXISTS accounts;
CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY,
    username VARCHAR,
    password VARCHAR,
    birthdate DATE,
    age INTEGER,
    highscore INTEGER,
    coins INTEGER,
    skinShip INTEGER,
    skinLaser INTEGER
);

DROP TABLE IF EXISTS ships;
CREATE TABLE IF NOT EXISTS ships (
    id INTEGER PRIMARY KEY,
    name VARCHAR,
    url VARCHAR,
    price INTEGER
);

DROP TABLE IF EXISTS lasers;
CREATE TABLE IF NOT EXISTS lasers (
    id INTEGER PRIMARY KEY,
    name VARCHAR,
    url VARCHAR,
    price INTEGER
);