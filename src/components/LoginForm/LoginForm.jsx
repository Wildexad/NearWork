import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginForm.module.css';
import { UserModel } from '../../models/db';

const LoginForm = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await UserModel.findByEmail(email);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValid = await UserModel.validatePassword(user, password);
      if (!isValid) {
        throw new Error('Invalid credentials');
      }

      login({
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        avatarUrl: user.avatar_url
      });
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Войти в систему</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
          <p className={styles.switchForm}>
            Новый пользователь?
            <button
              type="button"
              className={styles.switchButton}
              onClick={onSwitchToRegister}
            >
              Зарегистрироваться
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;