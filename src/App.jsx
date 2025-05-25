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
      date: '21.07.2021',
      description: 'Требуется курьер для доставки заказов по городу. Свободный график работы, возможность совмещения с учебой или основной работой. Оплата каждую неделю.\n\nТребования:\n- Ответственность и пунктуальность\n- Наличие смартфона\n- Знание города\n\nОбязанности:\n- Доставка заказов по указанным адресам\n- Соблюдение сроков доставки\n- Вежливое общение с клиентами'
    },
    {
      id: 2,
      title: 'Грузчик',
      salary: '15 000 руб.',
      location: 'Санкт-Петербург',
      date: '22.07.2021',
      description: 'Требуется грузчик на склад. Стабильная работа в крупной компании.\n\nТребования:\n- Физическая выносливость\n- Готовность к активной работе\n- Ответственность\n\nОбязанности:\n- Погрузка и разгрузка товаров\n- Перемещение грузов по складу\n- Поддержание порядка на рабочем месте'
    },
    {
      id: 3,
      title: 'Официант',
      salary: '12 000 руб.',
      location: 'Москва',
      date: '23.07.2021',
      description: 'Ресторан итальянской кухни приглашает на работу официантов. Дружный коллектив, бесплатное питание.\n\nТребования:\n- Коммуникабельность\n- Опрятный внешний вид\n- Желание работать в сфере обслуживания\n\nОбязанности:\n- Обслуживание гостей ресторана\n- Прием заказов\n- Сервировка столов'
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

    // Apply text search filter
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery) ||
        job.location.toLowerCase().includes(searchQuery) ||
        job.salary.toLowerCase().includes(searchQuery)
      );
    }

    // Apply category filter
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
        <div className="App">
          <Header onAddJob={handleAddJob} />
          <Routes>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/" element={
              <>
                <div className="hero-section">
                  <h1 className="hero-title">Найдите работу своей мечты</h1>
                  <p className="hero-subtitle">Тысячи возможностей для вас. Начните поиск прямо сейчас!</p>
                </div>
                <SearchBar onSearch={handleSearch} />
                <JobList jobs={filteredJobs} />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
