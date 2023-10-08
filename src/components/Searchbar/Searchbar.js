import { useState } from 'react';
import { Form } from './Searchbar.styled';

export function Searchbar({ handleSearch }) {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value.trim());
  };
  const handleSubmit = e => {
    e.preventDefault();
    handleSearch(value);
    setValue('');
  };

  return (
    <>
      <header className="searchbar">
        <Form className="form" onSubmit={handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            onChange={handleChange}
            placeholder="Search images and photos"
            value={value}
          />
        </Form>
      </header>
    </>
  );
}
