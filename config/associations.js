const Course = require('../model/Course');
const Category = require('../model/Category');

Course.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Course, { foreignKey: 'categoryId', as: 'courses' });

module.exports = { Course, Category };
