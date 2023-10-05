import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { getData } from 'components/api/api';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Gallery } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  state = {
    images: [],
    modalIsOpen: false,
    status: 'idle',
    pages: 1,
    viewImage: '',
    isLoadMoreButton: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({ status: 'panding', images: [] });
      this.getPictures(this.props.searchText);
    }
    if (prevState.pages !== this.state.pages) {
      this.getPictures(this.props.searchText, this.state.pages);
    }
  }
  getPictures = async (value, pages) => {
    try {
      const pictures = await getData(value, pages);
      this.setState(prevState => ({
        images: [...prevState.images, ...pictures.data.hits],
        status: 'resolved',

        isLoadMoreButton:
          this.state.pages < Math.ceil(pictures.data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ status: 'error' });
    }
  };
  onLoadMore = () => {
    this.setState(prevState => ({ pages: prevState.pages + 1 }));
  };
  onClickImage = (urlImage, tags) => {
    this.setState({
      viewImage: { urlImage, tags },
      modalIsOpen: true,
    });
  };
  onCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };
  render() {
    if (this.state.status === 'panding') {
      return <Loader />;
    }
    if (this.state.status === 'resolved') {
      return (
        <>
          <Gallery className="gallery">
            {this.state.images.map(image => (
              <ImageGalleryItem
                key={image.id}
                src={image.largeImageURL}
                tags={image.tags}
                onClick={this.onClickImage}
              />
            ))}
          </Gallery>
          <Button
            onLoadMore={this.onLoadMore}
            isLoad={this.state.isLoadMoreButton}
          />

          {this.state.modalIsOpen && (
            <Modal
              viewImage={this.state.viewImage}
              onCloseModal={this.onCloseModal}
            >
              <img
                className="modal-image"
                src={this.state.viewImage.urlImage}
                alt={this.state.viewImage.tags}
              />
            </Modal>
          )}
        </>
      );
    }
    if (this.state.status === 'error') {
      return <div>"Oops...something wrong. Try again :("</div>;
    }
  }
}
