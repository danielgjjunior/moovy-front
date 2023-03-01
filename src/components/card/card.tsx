import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faPlayCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { addMovieToLibrary } from "../../services/movie";

import styles from "./card.module.css";
import { useState } from "react";

interface CardProps {
  title: string;
  year: string;
  genre: string;
  director: string;
  writer: string;
  imdbRating: number;
  imdbID: string;
  posterUrl: string;
  hasAudio?: boolean; // adicionando uma propriedade opcional para indicar se há áudio gravado
  onPlayAudio?: () => void;
  isInLibrary?: boolean;
  exclusiveLibrary: boolean;
}

export function Card(props: CardProps) {
  const [isInLibrary, setIsInLibrary] = useState<boolean>(
    props.isInLibrary || false
  );
  const [successMessage, setSuccessMessage] = useState("");

  function handleAddToLibrary() {
    const userId = "023f5da1-70b0-48db-a7a6-6d4f97188c86";
    const movie = JSON.stringify(props);
    addMovieToLibrary(userId, movie)
      .then(() => {
        setSuccessMessage("Filme adicionado com sucesso!");
        setIsInLibrary(true);
      })
      .catch((error) => {
        setSuccessMessage("Houve um erro ao adicionar o filme");
      });
  }

  return (
    <div className={styles.card}>
      <img
        src={props.posterUrl}
        alt={`Imagem de ${props.title}`}
        className={styles.img}
      />
      <div>
        {props.exclusiveLibrary && props.hasAudio ? (
          <FontAwesomeIcon icon={faPlayCircle} className={styles.icon} />
        ) : (
          props.exclusiveLibrary && <button>Gravar Áudio</button>
        )}
      </div>

      <div className={styles.movieInfo}>
        <h3>{props.title}</h3>
        <p>
          <FontAwesomeIcon icon={faStar} />
          {props.imdbRating}
        </p>
      </div>
      <button
        className={isInLibrary ? styles.buttonAdded : styles.button}
        onClick={handleAddToLibrary}
      >
        <FontAwesomeIcon icon={faBook} />
        {isInLibrary ? "In Library" : "Add To My Library"}
      </button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}
