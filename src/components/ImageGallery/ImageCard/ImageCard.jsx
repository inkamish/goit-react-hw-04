import styles from "./ImageCard.module.css";

const ImageCard = ({
  info: {
    alt_description,
    urls: { small },
  },
}) => {
  return (
    <div className={styles.imgContainer}>
      <img className={styles.img} src={small} alt={alt_description} />
    </div>
  );
};

export default ImageCard;
