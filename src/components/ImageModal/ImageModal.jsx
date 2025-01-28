import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      contentLabel="Image Modal"
      closeTimeoutMS={300}
    >
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className={styles.image}
      />
      <div className={styles.info}>
        <p>Author: {image.user.name || "Unknown"}</p>
        <p>Likes: {image.likes || 0}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
