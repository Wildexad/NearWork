import React, { useState } from 'react';
import styles from './AddJobForm.module.css';

const AddJobForm = ({ onClose, onSubmit }) => {
  const [jobData, setJobData] = useState({
    title: '',
    salary: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...jobData,
      id: Date.now(), // Simple way to generate unique IDs
      date: new Date().toLocaleDateString('ru-RU')
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Добавить вакансию</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="title">Название вакансии:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="salary">Зарплата:</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              required
              placeholder="например: 10 000 руб."
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="location">Место работы:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobForm;