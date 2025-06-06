import React from 'react';
import styles from './JobDetails.module.css';

const JobDetails = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.content}>
          <div className={styles.mainInfo}>
            <h2 className={styles.title}>{job.title}</h2>
            <p className={styles.salary}>{job.salary}</p>
            <p className={styles.location}>{job.location}</p>
            <p className={styles.date}>Опубликовано: {job.date}</p>
          </div>

          <div className={styles.section}>
            <h3>Контакты работодателя</h3>
            <p className={styles.contact}>
              <span>Михаил</span>
              <a href={`tel:89011222334`}>8 901 122-23-34</a>
            </p>
          </div>

          <div className={styles.section}>
            <h3>Категория</h3>
            <p>Курьерская доставка</p>
          </div>

          <div className={styles.actions}>
            <button className={styles.applyButton}>Откликнуться</button>
            <button className={styles.favoriteButton}>В избранное</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;