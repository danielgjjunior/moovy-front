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
}

export const searchMovies = async (searchTerm: string) => {
  console.log(searchTerm);
  try {
    // Faz uma chamada para obter a lista de filmes
    const searchResponse = await axios.get(
      `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchTerm}`
    );

    // Verifica se a busca foi bem sucedida e a resposta contém resultados
    if (searchResponse.data.Response === "True") {
      const moviePromises = searchResponse.data.Search.map(
        async (movie: any): Promise<MovieData | null> => {
          try {
            const movieResponse = await axios.get(
              `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`
            );
            return {
              title: movieResponse.data.Title,
              year: movieResponse.data.Year,
              genre: movieResponse.data.Genre,
              director: movieResponse.data.Director,
              writer: movieResponse.data.Writer,
              imdbRating: movieResponse.data.imdbRating,
              imdbID: movieResponse.data.imdbID,
              posterUrl: movieResponse.data.Poster,
            };
          } catch (error) {
            console.error(error);
            return null;
          }
        }
      );

      const movies = (await Promise.all(moviePromises)).filter(
        (movie) => movie !== null
      ) as MovieData[];
      console.log(movies);
      return movies;
    } else {
      console.log("Algo deu errado");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchTopMovies = async () => {
  try {
    // Faz uma chamada para obter a lista de filmes
    const searchResponse = await axios.get(
      `http://www.omdbapi.com/?s=random&type=movie&apikey=${OMDB_API_KEY}`
    );

    // Verifica se a busca foi bem sucedida e a resposta contém resultados
    if (searchResponse.data.Response === "True") {
      const moviePromises = searchResponse.data.Search.map(
        async (movie: any): Promise<MovieData | null> => {
          try {
            const movieResponse = await axios.get(
              `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.imdbID}`
            );
            return {
              title: movieResponse.data.Title,
              year: movieResponse.data.Year,
              genre: movieResponse.data.Genre,
              director: movieResponse.data.Director,
              writer: movieResponse.data.Writer,
              imdbRating: movieResponse.data.imdbRating,
              imdbID: movieResponse.data.imdbID,
              posterUrl: movieResponse.data.Poster,
            };
          } catch (error) {
            console.error(error);
            return null;
          }
        }
      );

      const movies = (await Promise.all(moviePromises)).filter(
        (movie) => movie !== null
      ) as MovieData[];
      console.log(movies);
      return movies;
    } else {
      console.log("Algo deu errado");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
