import styles from "./library.module.css";
import logoBlack from "../../assets/img/MoovyBlack.png";
import logoWhite from "../../assets/img/MoovyWhite.png";
import { useEffect, useState } from "react";
import Typewriter from "../../components/typeWriter/typeWriter";
import emoji from "../../assets/gif/emoji.gif";
import player from "../../assets/gif/player.gif";

export function Library() {
  const [scrolled, setScrolled] = useState(false);

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
      </div>
      <div className={styles.user}>
        <img src={emoji} alt="Emoji de beijo" className={styles.emoji} />
        <Typewriter text="Daniel. Bem-vindo ao Moovy !!" delay={100} />
        <img src={player} alt="Emoji de beijo" className={styles.player} />
      </div>
      <div className={styles.body}>
        <div className={styles.cards}></div>
      </div>
    </div>
  );
}
