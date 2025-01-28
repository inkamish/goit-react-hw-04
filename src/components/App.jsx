import { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";
import fetchImages from "./API/API";
import styles from "./App.module.css";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(false);
    setLoading(true);
    setHasMore(true);
    setHasSearched(true);

    try {
      const data = await fetchImages(newQuery, 1);
      setImages(data.results);

      if (data.results.length === 0) {
        setHasMore(false);
      } else if (data.total_pages <= 1) {
        setHasMore(false);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore) return;

    setLoading(true);

    try {
      const nextPage = page + 1;
      const data = await fetchImages(query, nextPage);

      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage(nextPage);

      if (data.results.length === 0 || nextPage >= data.total_pages) {
        setHasMore(false);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}

      {!loading && hasSearched && images.length === 0 && !error && (
        <p>No results found. Try searching for something else!</p>
      )}

      {error && <ErrorMessage />}
      {images.length > 0 && !loading && hasMore && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}

export default App;
