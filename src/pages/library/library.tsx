import styles from "./library.module.css";
import logoBlack from "../../assets/img/MoovyBlack.png";
import logoWhite from "../../assets/img/MoovyWhite.png";

import { Card } from "../../components/card/card";
import { useEffect, useState } from "react";
import Typewriter from "../../components/typeWriter/typeWriter";

import { getUserMovies } from "../../services/library";




interface MovieData {
  id:string;
  title: string;
  year: string;
  genre: string;
  director: string;
  writer: string;
  imdbRating: string;
  imdbID: string;
  posterUrl: string;
}

export function Library() {
  const [scrolled, setScrolled] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [initialized, setInitialized] = useState(false);

  interface Movie {
    id:string;
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
  

  useEffect(() => {
    const fetchMovies = async (userId: string) => {
      try {
        const response = await getUserMovies(userId);

        if (response) {
          const filteredMovies: Movie[] = response.map((movie: MovieData) => {
            return {
              id:movie.id,
              imdbID: movie.imdbID,
              title: movie.title,
              year: movie.year,
              rating: parseFloat(movie.imdbRating),
              poster: movie.posterUrl,
              director: movie.director,
              writer: movie.writer,
              genre: movie.genre,
            };
          });

          setMovies(filteredMovies);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies("023f5da1-70b0-48db-a7a6-6d4f97188c86");
  }, []);

  

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
          <a
            href="/Library"
            className={`${styles.libraryLink} ${
              scrolled ? styles.libraryLinkScroll : ""
            }`}
          >
            My Library
          </a>
          <a href="/Home" className={styles.searchLink}>
            Search
          </a>
        </div>
      </div>
      <div className={styles.user}>
        <Typewriter text="Library !!" delay={100} />
      </div>
      <div className={styles.body}>
        <div className={styles.cards}>
          {movies.map((movie) => (
            <Card
              id={movie.id}
              key={movie.imdbID}
              title={movie.title}
              year={movie.year}
              posterUrl={movie.poster}
              imdbRating={movie.rating}
              director={movie.director}
              genre={movie.genre}
              imdbID={movie.imdbID}
              writer={movie.writer}
              hasAudio={movie.hasAudio}
              exclusiveLibrary={true}    
            />
          ))}
        </div>
      </div>
    </div>
  );
}

