import User from './User.js';
import Job from './Job.js';
import Application from './Application.js';
import { sequelize } from '../config/database.js';

// Define associations between models
User.hasMany(Job, { foreignKey: 'user_id', as: 'jobs' });
Job.belongsTo(User, { foreignKey: 'user_id', as: 'creator' });

User.hasMany(Application, { foreignKey: 'user_id', as: 'applications' });
Job.hasMany(Application, { foreignKey: 'job_id', as: 'applications' });

Application.belongsTo(User, { foreignKey: 'user_id', as: 'applicant' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

// Sync all models with database
async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
}

export {
  User,
  Job,
  Application,
  syncDatabase
};