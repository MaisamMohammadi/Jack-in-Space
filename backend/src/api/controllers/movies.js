import * as model from '../models/movies.js';

const getMovies = async (req, res) => {
  const rows = await model.dbGetMovies();
  if (!rows) return res.status(404).send('Ressource not found');
  return res.status(200).json(rows);
};

const getMovie = async (req, res) => {
  const { id } = req.params;
  const rows = await model.dbGetMovie(id);
  if (!rows) return res.status(404).send('Ressource not found');
  return res.status(200).json(rows[0]);
};

export { getMovies, getMovie };
