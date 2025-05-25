import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ['Курьер', 'Грузчик', 'Официант', 'Промоутер'];

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters(searchQuery);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    applyFilters(value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      applyFilters(searchQuery, newCategories);
      return newCategories;
    });
  };

  const applyFilters = (query, categories = selectedCategories) => {
    onSearch({ query, categories });
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Поиск по вакансиям"
          value={searchQuery}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Начать поиск
        </button>
      </form>
      <div className={styles.popularCategories}>
        <h3>Популярные категории</h3>
        <div className={styles.categories}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.categoryButton} ${selectedCategories.includes(category) ? styles.active : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;