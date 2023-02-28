import React, { useState, useEffect } from "react";
import style from "./typeWriter.module.css";

interface TypewriterProps {
  text: string;
  delay: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay }) => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (typedText.length < text.length) {
      interval = setInterval(() => {
        setTypedText(text.substring(0, typedText.length + 1));
      }, delay);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [text, typedText, delay]);

  return <div className={style.text}>{typedText}</div>;
};

export default Typewriter;
