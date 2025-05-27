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
    // First, sync the User model
    await User.sync({ alter: true });
    console.log('User model synchronized successfully.');

    // Then sync the Job model
    await Job.sync({ alter: true });
    console.log('Job model synchronized successfully.');

    // Finally sync the Application model
    await Application.sync({ alter: true });
    console.log('Application model synchronized successfully.');

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