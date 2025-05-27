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
      salary: '1 000 руб.',
      location: 'Москва',
      date: '21.07.2021',
      description: 'Требуется курьер для доставки заказов по городу. Свободный график работы, возможность совмещения с учебой или основной работой. Оплата каждую неделю.\n\nТребования:\n- Ответственность и пунктуальность\n- Наличие смартфона\n- Знание города\n\nОбязанности:\n- Доставка заказов по указанным адресам\n- Соблюдение сроков доставки\n- Вежливое общение с клиентами'
    },
    {
      id: 2,
      title: 'Грузчик',
      salary: '1 500 руб.',
      location: 'Санкт-Петербург',
      date: '22.07.2021',
      description: 'Требуется грузчик на склад. Стабильная работа в крупной компании.\n\nТребования:\n- Физическая выносливость\n- Готовность к активной работе\n- Ответственность\n\nОбязанности:\n- Погрузка и разгрузка товаров\n- Перемещение грузов по складу\n- Поддержание порядка на рабочем месте'
    },
    {
      id: 3,
      title: 'Официант',
      salary: '1 200 руб.',
      location: 'Москва',
      date: '23.07.2021',
      description: 'Ресторан итальянской кухни приглашает на работу официантов. Дружный коллектив, бесплатное питание.\n\nТребования:\n- Коммуникабельность\n- Опрятный внешний вид\n- Желание работать в сфере обслуживания\n\nОбязанности:\n- Обслуживание гостей ресторана\n- Прием заказов\n- Сервировка столов'
    },
    {
      id: 4,
      title: 'Бариста',
      salary: '1 300 руб.',
      location: 'Москва',
      date: '24.07.2021',
      description: 'Уютная кофейня ищет бариста. Обучение за счет компании, гибкий график.\n\nТребования:\n- Любовь к кофе\n- Внимательность к деталям\n- Доброжелательность\n\nОбязанности:\n- Приготовление кофейных напитков\n- Обслуживание гостей\n- Поддержание чистоты рабочего места'
    },
    {
      id: 5,
      title: 'Охранник',
      salary: '1 800 руб.',
      location: 'Санкт-Петербург',
      date: '24.07.2021',
      description: 'Требуется охранник в торговый центр. График работы 2/2.\n\nТребования:\n- Наличие лицензии\n- Опыт работы приветствуется\n- Внимательность\n\nОбязанности:\n- Контроль порядка на объекте\n- Видеонаблюдение\n- Обход территории'
    },
    {
      id: 6,
      title: 'Промоутер',
      salary: '900 руб.',
      location: 'Екатеринбург',
      date: '25.07.2021',
      description: 'Раздача листовок и промо-материалов. Работа в центре города.\n\nТребования:\n- Активность\n- Коммуникабельность\n- Позитивный настрой\n\nОбязанности:\n- Раздача рекламных материалов\n- Информирование прохожих об акциях\n- Ведение отчетности'
    },
    {
      id: 7,
      title: 'Кладовщик',
      salary: '1 700 руб.',
      location: 'Новосибирск',
      date: '25.07.2021',
      description: 'Работа на современном складе. Официальное оформление.\n\nТребования:\n- Опыт работы со складским учетом\n- Знание ПК\n- Внимательность\n\nОбязанности:\n- Прием и отгрузка товара\n- Инвентаризация\n- Ведение складской документации'
    },
    {
      id: 8,
      title: 'Уборщик',
      salary: '1 100 руб.',
      location: 'Казань',
      date: '26.07.2021',
      description: 'Требуется уборщик в бизнес-центр. Стабильная работа.\n\nТребования:\n- Аккуратность\n- Ответственность\n- Исполнительность\n\nОбязанности:\n- Влажная уборка помещений\n- Поддержание чистоты\n- Уборка санузлов'
    },
    {
      id: 9,
      title: 'Посудомойщик',
      salary: '1 000 руб.',
      location: 'Нижний Новгород',
      date: '26.07.2021',
      description: 'Работа в ресторане быстрого питания. Бесплатное питание.\n\nТребования:\n- Чистоплотность\n- Выносливость\n- Пунктуальность\n\nОбязанности:\n- Мытье посуды\n- Поддержание чистоты на кухне\n- Помощь поварам'
    },
    {
      id: 10,
      title: 'Водитель-доставщик',
      salary: '1 400 руб.',
      location: 'Москва',
      date: '27.07.2021',
      description: 'Доставка еды из ресторанов. Свободный график.\n\nТребования:\n- Наличие автомобиля\n- Водительские права категории B\n- Знание города\n\nОбязанности:\n- Доставка заказов\n- Работа с приложением\n- Расчет с клиентами'
    },
    {
      id: 11,
      title: 'Продавец-консультант',
      salary: '1 200 руб.',
      location: 'Санкт-Петербург',
      date: '27.07.2021',
      description: 'Работа в магазине одежды. Дружный коллектив.\n\nТребования:\n- Грамотная речь\n- Опыт работы в продажах приветствуется\n- Желание развиваться\n\nОбязанности:\n- Консультирование покупателей\n- Работа с кассой\n- Выкладка товара'
    },
    {
      id: 12,
      title: 'Парковщик',
      salary: '1 000 руб.',
      location: 'Москва',
      date: '28.07.2021',
      description: 'Работа на парковке торгового центра. График 2/2.\n\nТребования:\n- Внимательность\n- Стрессоустойчивость\n- Вежливость\n\nОбязанности:\n- Координация движения автомобилей\n- Помощь в парковке\n- Контроль порядка на парковке'
    },
    {
      id: 13,
      title: 'Помощник организатора мероприятий',
      salary: '1 500 руб.',
      location: 'Москва',
      date: '28.07.2021',
      description: 'Работа на различных мероприятиях. Возможность карьерного роста.\n\nТребования:\n- Организаторские способности\n- Коммуникабельность\n- Стрессоустойчивость\n\nОбязанности:\n- Помощь в организации мероприятий\n- Координация персонала\n- Решение организационных вопросов'
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
                  <h1 className="hero-title">Найдите работу всего на день</h1>
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
