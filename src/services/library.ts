import axios from "axios";

const OMDB_API_KEY = "92ff6459";

interface MovieData {
  title: string;
  year: string;
  genre: string;
  director: string;
  writer: string;
  imdbRating: string;
  imdbID: string;
  posterUrl: string;
  audioPath?: string;
  audioName?: string;
}

export const getUserMovies = async (userId: string) => {
  const API_URL = "http://localhost:3000";

  try {
    const { data } = await axios.get(`${API_URL}/library/userMovies?userId=${userId}`);

    return data.map((movieResponse: any) => ({
      title: movieResponse.movie.title,
      year: movieResponse.movie.year,
      genre: movieResponse.movie.genre,
      director: movieResponse.movie.director,
      writer: movieResponse.movie.writer,
      imdbRating: movieResponse.movie.imdbRating,
      imdbID: movieResponse.movie.imdbID,
      posterUrl: movieResponse.movie.posterUrl,
      audioPath: movieResponse.audioPath || undefined,
      audioName: movieResponse.audioName || undefined,
    }));
  } catch (error) {
    console.error(error);
    return null;
  }
};
