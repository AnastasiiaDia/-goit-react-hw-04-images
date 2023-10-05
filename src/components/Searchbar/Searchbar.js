import { Component } from 'react';
import { Form } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    value: '',
  };
  handleChange = event => {
    this.setState({ value: event.target.value.trim() });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <>
        <header className="searchbar">
          <Form className="form" onSubmit={this.handleSubmit}>
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>
            <input
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              onChange={this.handleChange}
              placeholder="Search images and photos"
              value={this.state.value}
            />
          </Form>
        </header>
      </>
    );
  }
}
