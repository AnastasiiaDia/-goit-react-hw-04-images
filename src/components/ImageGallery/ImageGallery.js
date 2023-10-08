import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { useEffect, useState } from 'react';
import { getData } from 'components/api/api';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Gallery } from './ImageGallery.styled';

export default function ImageGallery({ searchText }) {
  const [images, setImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [pages, setPages] = useState(1);
  const [viewImage, setViewImage] = useState({ urlImage: '', tags: [] });
  const [isLoadMoreButton, setIsLoadMoreButton] = useState(false);

  // при зміні запиту очищаємо масив з картинками і встановлюємо дефолтну першу сторінку//
  useEffect(() => {
    setImages([]);
    setPages(1);
  }, [searchText]);

  // робимо запит на сервер при зміні значення запиту або поточної сторінки//
  useEffect(() => {
    if (!searchText) return;
    setStatus('pending');

    const getPictures = async (searchText, pages) => {
      try {
        const images = await getData(searchText, pages);
        if (images.status === 200) {
          if (pages === 1) {
            setImages(images.data.hits);
          } else {
            setImages(prevState => [...prevState, ...images.data.hits]);
          }
          setStatus('resolved');
          setIsLoadMoreButton(pages < Math.ceil(images.data.totalHits / 12));
        } else {
          return Promise.reject('Error');
        }
      } catch (error) {
        setStatus('error');
      }
    };
    getPictures(searchText, pages);
  }, [searchText, pages]);

  // функція зміни сторінки на наступну при натисканні на кнопку LoadMore
  const onLoadMore = () => {
    setPages(pages => pages + 1);
  };

  //  по кліку отримуємо url картинки і tags і відкривається модальне вікно

  const onClickImage = (urlImage, tags) => {
    setViewImage({ urlImage, tags });
    setModalIsOpen(true);
  };

  // функція закриття модального вікна
  const onCloseModal = () => {
    setModalIsOpen(false);
  };

  if (status === 'panding') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <>
        <Gallery className="gallery">
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              src={image.largeImageURL}
              tags={image.tags}
              onClick={onClickImage}
            />
          ))}
        </Gallery>
        <Button onLoadMore={onLoadMore} isLoad={isLoadMoreButton} />

        {modalIsOpen && (
          <Modal viewImage={viewImage} onCloseModal={onCloseModal}>
            <img
              className="modal-image"
              src={viewImage.urlImage}
              alt={viewImage.tags}
            />
          </Modal>
        )}
      </>
    );
  }
  if (status === 'error') {
    return <div>"Oops...something wrong. Try again :("</div>;
  }
}
