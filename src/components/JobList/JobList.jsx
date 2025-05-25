import React, { useState } from 'react';
import styles from './JobList.module.css';
import JobDetails from '../JobDetails/JobDetails';

const JobList = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className={styles.jobListContainer}>
      <h2 className={styles.title}>Свежие вакансии</h2>
      <div className={styles.jobGrid}>
        {jobs.map(job => (
          <div key={job.id} className={styles.jobCard} onClick={() => setSelectedJob(job)}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <p className={styles.salary}>{job.salary}</p>
            <p className={styles.location}>{job.location}</p>
            <p className={styles.date}>{job.date}</p>
          </div>
        ))}      
      </div>
      {selectedJob && <JobDetails job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
};

export default JobList;