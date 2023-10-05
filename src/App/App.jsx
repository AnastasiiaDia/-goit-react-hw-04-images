import { Container } from './App.styled';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { Component } from 'react';

export class App extends Component {
  state = {
    searchText: '',
  };

  handleSearch = searchText => {
    this.setState({ searchText });
  };
  render() {
    return (
      <Container>
        <Searchbar handleSearch={this.handleSearch}></Searchbar>
        <ImageGallery searchText={this.state.searchText} />
      </Container>
    );
  }
}
