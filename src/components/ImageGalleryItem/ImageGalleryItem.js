import { Li } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, tags, onClick }) => {
  return (
    <Li className="gallery-item" onClick={() => onClick(src, tags)}>
      <img src={src} width="200px" alt={tags} />
    </Li>
  );
};
