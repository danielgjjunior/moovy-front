import axios from "axios";

interface Movie {
  id:string;
  title: string;
  year: string;
  genre: string;
  director: string;
  writer: string;
  imdbRating: number;
  imdbID: string;
  posterUrl: string;
  hasAudio?: boolean;
  onPlayAudio?: () => void;
}

const API_URL = "http://localhost:3000";

export const addMovieToLibrary = async (userId: string, movie: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/library?userId=${userId}`,
      movie,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
