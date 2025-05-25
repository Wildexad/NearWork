import React, { useState } from 'react';
import styles from './Header.module.css';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import AddJobForm from '../AddJobForm/AddJobForm';
import { useNavigate } from 'react-router-dom';

const Header = ({ onAddJob }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSwitchToRegister = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegistrationForm(false);
    setShowLoginForm(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>NearWork</div>
      <div className={styles.authSection}>
        {user ? (
          <>
            <div className={styles.userInfo} onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
              <span className={styles.userName}>{`${user.firstName} ${user.lastName}`}</span>
              <img src={user.avatarUrl} alt="User avatar" className={styles.userAvatar} />
            </div>
            {user.role === 'admin' && (
              <button className={styles.addJobButton} onClick={() => setShowAddJobForm(true)}>
                Добавить вакансию
              </button>
            )}
          </>
        ) : (
          <button className={styles.loginButton} onClick={() => setShowLoginForm(true)}>
            Войти
          </button>
        )}
      </div>
      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} onSwitchToRegister={handleSwitchToRegister} />}
      {showRegistrationForm && <RegistrationForm onClose={() => setShowRegistrationForm(false)} onSwitchToLogin={handleSwitchToLogin} />}
      {showAddJobForm && <AddJobForm onClose={() => setShowAddJobForm(false)} onSubmit={onAddJob} />}
    </header>
  );
};

export default Header;