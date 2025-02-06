import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';

const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim() === '') {
      return;
    }
    onSubmit(input);
    setInput('');
  };

  return (
    <header className="searchbar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search images..."
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
