import { Container } from './App.styled';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { useState } from 'react';

export function App() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = searchText => {
    setSearchText(searchText);
  };

  return (
    <Container>
      <Searchbar handleSearch={handleSearch}></Searchbar>
      <ImageGallery searchText={searchText} />
    </Container>
  );
}
