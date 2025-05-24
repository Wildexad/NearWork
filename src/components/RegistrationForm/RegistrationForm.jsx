import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './RegistrationForm.module.css';
import { UserModel } from '../../models/db';

const RegistrationForm = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatarUrl: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real application, you would upload this to a server
      // For demo purposes, we'll create a local URL
      const url = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        avatarUrl: url
      }));
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      const existingUser = await UserModel.findByEmail(formData.email);
      if (existingUser) {
        setError('Пользователь с таким email уже существует');
        return;
      }

      const user = await UserModel.create({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        avatarUrl: formData.avatarUrl
      });

      await register({
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        avatarUrl: user.avatar_url,
        role: user.role
      });
      
      onClose();
    } catch (err) {
      setError('Ошибка при регистрации. Пожалуйста, попробуйте позже.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="firstName">Имя:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="lastName">Фамилия:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Подтвердите пароль:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="avatar">Фото профиля:</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleAvatarChange}
              accept="image/*"
            />
            {formData.avatarUrl && (
              <img
                src={formData.avatarUrl}
                alt="Preview"
                className={styles.avatarPreview}
              />
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Зарегистрироваться
          </button>

          <p className={styles.switchForm}>
            Уже есть аккаунт?
            <button
              type="button"
              className={styles.switchButton}
              onClick={onSwitchToLogin}
            >
              Войти
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;