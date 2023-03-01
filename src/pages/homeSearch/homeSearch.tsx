import styles from "./home.module.css";
import logoBlack from "../../assets/img/MoovyBlack.png";
import logoWhite from "../../assets/img/MoovyWhite.png";
import { SearchBar } from "../../components/searchbar/searchbar";
import { Card } from "../../components/card/card";
import { useEffect, useState } from "react";
import Typewriter from "../../components/typeWriter/typeWriter";
import emoji from "../../assets/gif/emoji.gif";
import player from "../../assets/gif/player.gif";
import { searchMovies } from "../../services/Omdbapi";
import { searchTopMovies } from "../../services/Omdbapi";

interface Movie {
  imdbID: string;
  title: string;
  year: string;
  rating: number;
  releaseDate?: string;
  poster: string;
  director: string;
  writer: string;
  genre: string;
  hasAudio?: boolean;
  onPlayAudio?: () => void;
}

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

export function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    (async function getTopMovies(): Promise<void> {
      console.log("Executando");
      const response = await searchTopMovies();
      console.log('entrou')

      if (response) {
        const filteredMovies: Movie[] = response.map((movie: MovieData) => {
          return {
            imdbID: movie.imdbID,
              title: movie.title,
              year: movie.year,
              rating: parseFloat(movie.imdbRating),
              poster: movie.posterUrl,
              director:movie.director,
              writer:movie.writer,
              genre:movie.genre
          };
        });
        
        setMovies(filteredMovies);
      } else {
        setMovies([]);
      }
    })();
    setInitialized(true);
  }

  async function handleSearch(searchTerm: string): Promise<void> {
    const response = await searchMovies(searchTerm);

    if (response) {
      const filteredMovies: Movie[] = response.map((movie: MovieData) => {
        return {
          imdbID: movie.imdbID,
            title: movie.title,
            year: movie.year,
            rating: parseFloat(movie.imdbRating),
            poster: movie.posterUrl,
            director:movie.director,
            writer:movie.writer,
            genre:movie.genre
        };
      });

      setMovies(filteredMovies);
    } else {
      setMovies([]);
    }
  }

  function handlePlayAudio() {
    // reproduzir o áudio gravado
  }

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className={styles.homeSearchPage}>
      <div className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <img
          src={scrolled ? logoWhite : logoBlack}
          alt="Logo Moovy"
          className={styles.logo}
        />
        <div className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
          <a href="/Home" className={styles.searchLink}>Search</a>
          <a href="/Library" className={`${styles.libraryLink} ${scrolled ? styles.libraryLinkScroll : ""}`}>My Library</a>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.user}>
        <img src={emoji} alt="Emoji de beijo" className={styles.emoji} />
        <Typewriter text="Daniel. Bem-vindo ao Moovy !!" delay={100} />
        <img src={player} alt="Emoji de beijo" className={styles.player} />
      </div>
      <div className={styles.body}>
        <div className={styles.cards}>
          {movies.map((movie) => (
            <Card
              key={movie.imdbID}
              title={movie.title}
              year={movie.year}
              posterUrl={movie.poster}
              imdbRating={movie.rating}
              director={movie.director}
              genre={movie.genre}
              imdbID={movie.imdbID}
              writer={movie.writer}   
              exclusiveLibrary={false}         
              />
          ))}
        </div>
      </div>
    </div>
  );
}
