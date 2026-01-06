const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Category = require('./Category');

const Course = db.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [3, 255] }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { len: [10] }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
  level: {
    type: DataTypes.ENUM('débutant', 'intermédiaire', 'avancé'),
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 }
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

module.exports = Course;
