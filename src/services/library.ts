import axios from "axios";

interface MovieInfo {
  imdbID: string;
  title: string;
  year: string;
  imdbRating: number;
  posterUrl: string;
  director: string;
  writer: string;
  genre: string;
}

const API_URL = "http://localhost:3000"

export async function getMovieInfo(userId: string): Promise<MovieInfo[]> {
  const response = await axios.get<MovieInfo[]>(`${API_URL}/library?userId=${userId}`);
  return response.data;
}

export async function getMovieInfoById(movieId: string): Promise<MovieInfo> {
  const response = await axios.get<MovieInfo>(`${API_URL}/movies?movieId=${movieId}`);
  return response.data;
}

export async function getMovies(userId: string): Promise<Movie[]> {
  const userMovies = await getMovieInfo(userId);
  const movies: Movie[] = [];

  for (const userMovie of userMovies) {
    const movieInfo = await getMovieInfoById(userMovie.movie_id);

    const filteredMovie: Movie = {
      imdbID: movieInfo.imdbID,
      title: movieInfo.title,
      year: movieInfo.year,
      rating: movieInfo.imdbRating,
      poster: movieInfo.posterUrl,
      director: movieInfo.director,
      writer: movieInfo.writer,
      genre: movieInfo.genre,
    };

    movies.push(filteredMovie);
  }

  return movies;
}

interface Movie {
  imdbID: string;
  title: string;
  year: string;
  rating: number;
  poster: string;
  director: string;
  writer: string;
  genre: string;
}
