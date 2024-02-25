import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages, PAGE_SIZE } from 'api/api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

const App = () => {
  const [images, setImages] = useState([]);
  const [modalMedia, setModalMedia] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onImageClick = (image) => {
    document.body.style.overflow = 'hidden';
    setModalMedia(image);
  };

  const onSearch = (query) => {
    setQuery(query);
    setCurrentPage(1);
  };

  const onLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const onModalClose = () => {
    document.body.style = '';
    setModalMedia(null);
  };

  useEffect(() => {
    if (!query) return;
    const fetchImagesData = async () => {
      try {
        setIsLoading(true);
        const resp = await fetchImages({
          searchQuery: query,
          currentPage,
        });
        setImages((prevImages) => [...prevImages, ...resp.data.hits]);
        setShowLoadMoreButton(resp.data.hits.length >= PAGE_SIZE);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching images', error);
      }
    };
    fetchImagesData();
  }, [query, currentPage]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Searchbar onSubmit={onSearch} />
      <ImageGallery images={images} onImageClick={onImageClick} />
      {showLoadMoreButton && <Button onClick={onLoadMore} />}
      {modalMedia && <Modal image={modalMedia} onClose={onModalClose} />}
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
