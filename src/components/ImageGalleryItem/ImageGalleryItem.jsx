import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import "./ImageGalleryItem.css";

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <li className="image-gallery-item" onClick={() => setIsModalOpen(true)}>
        <img src={webformatURL} alt={tags} className="gallery-image" />
      </li>
      {isModalOpen && <Modal image={largeImageURL} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
