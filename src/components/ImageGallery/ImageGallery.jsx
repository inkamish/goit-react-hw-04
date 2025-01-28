import ImageCard from "./ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  if (!images || images.length === 0) {
    return <p>No images found</p>;
  }

  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li
          className={styles.galleryItem}
          key={image.id}
          onClick={() => onImageClick(image)}
        >
          <ImageCard info={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
