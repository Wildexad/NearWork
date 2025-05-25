import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <img
            src={user.avatarUrl || 'https://via.placeholder.com/150'}
            alt="Profile"
            className={styles.avatar}
          />
        </div>
        <div className={styles.infoSection}>
          <h2 className={styles.name}>
            {user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : 'Пользователь'}
          </h2>
          <p className={styles.email}>
            <i className="fas fa-envelope"></i>
            {user.email}
          </p>
          <p className={styles.role}>
            {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
          </p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;