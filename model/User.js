const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 50],
        msg: 'Le username doit contenir au moins 3 caractères'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Email invalide'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('instructor', 'admin'),
    allowNull: false,
    defaultValue: 'instructor'
  }
}, {
  timestamps: true
});

module.exports = User;
