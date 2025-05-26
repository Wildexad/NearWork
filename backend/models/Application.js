import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';
import Job from './Job.js';

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'reviewed', 'accepted', 'rejected'),
    defaultValue: 'pending'
  },
  cover_letter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    allowNull: false
  },
  job_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Jobs',
      key: 'id'
    },
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true
});

// Define associations
Application.belongsTo(User, { foreignKey: 'user_id' });
Application.belongsTo(Job, { foreignKey: 'job_id' });

// Add reverse associations
User.hasMany(Application, { foreignKey: 'user_id' });
Job.hasMany(Application, { foreignKey: 'job_id' });

export default Application;