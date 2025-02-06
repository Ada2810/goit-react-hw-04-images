import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';
import './App.css';

const API_KEY = '26322238-33d706a067034387360fd3b50';
const BASE_URL = 'https://pixabay.com/api/';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (response.data.hits.length === 0) {
          Notiflix.Notify.failure('No images found, try another search.');
          return;
        }

        setImages((prevImages) => [...prevImages, ...response.data.hits]);
        setTotalHits(response.data.totalHits);
      } catch (error) {
        Notiflix.Notify.failure('Something went wrong, please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) {
      Notiflix.Notify.info('You are already seeing these results.');
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} />
      {loading && <Loader />}
      {images.length > 0 && images.length < totalHits && (
        <Button onClick={() => setPage((prevPage) => prevPage + 1)} />
      )}
    </div>
  );
};

export default App;
