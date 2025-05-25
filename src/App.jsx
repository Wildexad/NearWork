import React, { useState } from 'react';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import JobList from './components/JobList/JobList';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Курьер',
      salary: '10 000 руб.',
      location: 'Москва',
      date: '21.07.2021'
    },
    {
      id: 2,
      title: 'Грузчик',
      salary: '15 000 руб.',
      location: 'Санкт-Петербург',
      date: '22.07.2021'
    },
    {
      id: 3,
      title: 'Официант',
      salary: '12 000 руб.',
      location: 'Москва',
      date: '23.07.2021'
    }
  ]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleAddJob = (newJob) => {
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs);
  };

  const handleSearch = ({ query, categories }) => {
    const searchQuery = query.toLowerCase();
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery) ||
        job.location.toLowerCase().includes(searchQuery) ||
        job.salary.toLowerCase().includes(searchQuery)
      );
    }

    if (categories && categories.length > 0) {
      filtered = filtered.filter(job =>
        categories.includes(job.title)
      );
    }

    setFilteredJobs(filtered);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header onAddJob={handleAddJob} />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <div className="hero-section">
                    <h1 className="hero-title">Найдите работу своей мечты</h1>
                    <p className="hero-subtitle">Тысячи возможностей для вас. Начните прямо сейчас!</p>
                  </div>
                  <SearchBar onSearch={handleSearch} />
                  <JobList jobs={filteredJobs} />
                </>
              } />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
