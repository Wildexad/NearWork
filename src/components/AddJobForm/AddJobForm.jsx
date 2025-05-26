import React, { useState } from 'react';
import styles from './AddJobForm.module.css';

const AddJobForm = ({ onClose, onSubmit }) => {
  const [jobData, setJobData] = useState({
    title: '',
    salary: '',
    location: '',
    description: '',
    contactName: '',
    contactPhone: ''
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
      description: jobData.description,
      id: Date.now(),
      date: new Date().toLocaleDateString('ru-RU')
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
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
          <div className={styles.inputGroup}>
            <label htmlFor="description">Описание вакансии:</label>
            <textarea
              id="description"
              name="description"
              value={jobData.description}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="contactName">Контактное лицо:</label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={jobData.contactName}
              onChange={handleChange}
              required
              placeholder="например: Михаил"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="contactPhone">Контактный телефон:</label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={jobData.contactPhone}
              onChange={handleChange}
              required
              placeholder="например: 8 901 122-23-34"
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