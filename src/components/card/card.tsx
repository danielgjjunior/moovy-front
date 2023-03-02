
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faPlayCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import { uploadAudio } from "../../services/audio";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { addMovieToLibrary } from "../../services/movie";

import styles from "./card.module.css";
import { useState } from "react";
import RecordRTC from "recordrtc";

interface CardProps {
  id:string;
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
  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  

  async function handleStartRecording(movieId:string) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.addEventListener('dataavailable', async (event) => {
      const file = new File([event.data], 'recording.wav', {
        type: 'audio/wav',
        lastModified: Date.now()
      });

      try {
        await uploadAudio('023f5da1-70b0-48db-a7a6-6d4f97188c86', movieId, file);
        console.log('Audio uploaded successfully!');
      } catch (error) {
        console.error(error);
      }
    });

    setMediaRecorder(mediaRecorder);
    setRecording(true);
    mediaRecorder.start();
  }
  async function handleStopRecording() {
    mediaRecorder.stop();
    setRecording(false);
  }
 


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
    <div
      className={styles.card}
      style={props.exclusiveLibrary ? { height: "55vh" } : {}}
    >
      <img
        src={props.posterUrl}
        alt={`Imagem de ${props.title}`}
        className={styles.img}
      />
      {props.hasAudio && (
          <div className={styles.playIcon} onClick={handlePlayAudio}>
            <FontAwesomeIcon icon={faPlayCircle} />
          </div>
        )}
      <div>
        {props.exclusiveLibrary && props.hasAudio ? (
          <FontAwesomeIcon icon={faPlayCircle} className={styles.icon} />
        ) : (
          props.exclusiveLibrary && (
            <div>
              {recording ? (
                <button onClick={handleStopRecording}>Stop Recording</button>
              ) : (
                <button onClick={() => { handleStartRecording(props.id); }}>Start Recording</button>
              )}
            </div>
          )
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
        style={props.exclusiveLibrary ? { display: "none" } : {}}
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
