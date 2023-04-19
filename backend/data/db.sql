-- here you can create your database tables and insert some data
DROP TABLE IF EXISTS movies;

CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY,
    title VARCHAR,
    year INTEGER,
    genre VARCHAR,
    type VARCHAR
);

INSERT INTO movies VALUES
    (0, 'Avatar', 2009, 'Action, Adventure, Fantasy', 'movie'),
    (1, 'I Am Legend', 2007, 'Drama, Horror, Sci-Fi', 'movie'),
    (2, '300', 2006, 'Action, Drama, Fantasy', 'movie'),
    (3, 'The Avengers', 2012, 'Action, Sci-Fi, Thriller', 'movie'),
    (4, 'The Wolf of Wall Street', 2013, 'Biography, Comedy, Crime', 'movie'),
    (5, 'Interstellar', 2014, 'Adventure, Drama, Sci-Fi', 'movie'),
    (6, 'Game of Thrones', 2011, 'Adventure, Drama, Fantasy', 'series'),
    (7, 'Vikings', 2013, 'Action, Drama, History', 'series'),
    (8, 'Gotham', 2014, 'Action, Crime, Drama', 'series'),
    (9, 'Power', 2014, 'Crime, Drama', 'series'),
    (10, 'Narcos', 2015, 'Biography, Crime, Drama', 'series'),
    (11, 'Breaking Bad', 2008, 'Crime, Drama, Thriller', 'series'),
    (12, 'Doctor Strange', 2016, 'Action, Adventure, Fantasy', 'movie'),
    (13, 'Rogue One: A Star Wars Story', 2016, 'Action, Adventure, Sci-Fi', 'movie'),
    (14, "Assassin's Creed", 2016, 'Action, Adventure, Fantasy', 'movie'),
    (15, 'Luke Cage', 2016, 'Action, Crime, Drama', 'series');
