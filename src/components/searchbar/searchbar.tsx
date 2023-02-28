import React, { useState } from "react";
import style from "./searchbar.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gif from "../../assets/gif/search.gif";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <form className={style.searchComponent}>
      <img src={gif} alt="Gif de busca" className={style.gif} />
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className={style.searchbar}
        placeholder="Digite aqui um filme. Ex: Batman"
      />
      <button type="submit" className={style.searchIcon}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}
