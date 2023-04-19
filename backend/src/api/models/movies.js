import query from '../../db/index.js';

const dbGetMovies = () => query('SELECT * FROM movies');

const dbGetMovie = (id) => query('SELECT * FROM movies WHERE id = $1', [id]);

export { dbGetMovies, dbGetMovie };
