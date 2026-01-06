const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Category = db.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { len: [3, 255] }
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true
});

Category.associate = (models) => {
  Category.hasMany(models.Course, { foreignKey: 'categoryId', as: 'courses' });
};

module.exports = Category;
