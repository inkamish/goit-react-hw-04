import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import styles from "./SearchBar.module.css";

const error = () => toast.error("Please enter a search query to find images..");

const SearchBar = ({ onSearch }) => {
  const [descr, setDescr] = useState("");

  const handleInputChange = (evt) => {
    setDescr(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (descr.trim() === "") {
      error();
      return;
    }
    onSearch(descr);
    setDescr("");
  };

  return (
    <header className={styles.header}>
      <form className={styles.searchContainer} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="descr"
          type="text"
          value={descr}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={styles.btn} type="submit">
          Search
        </button>
      </form>
      <Toaster
        toastOptions={{
          duration: 2500,
          removeDelay: 1000,
        }}
      />
    </header>
  );
};

export default SearchBar;
