const Category = require('../model/Category');
const Course = require('../model/Course');

const categoryService = {

  getAllCategories: async () => {
    return await Category.findAll({
      include: { model: Course, as: 'courses' }
    });
  },

  getCategoryById: async (id) => {
    const category = await Category.findByPk(id, {
      include: { model: Course, as: 'courses' }
    });
    return category;
  },

  createCategory: async (data) => {
    const { name, description } = data;
    const category = await Category.create({ name, description });
    return category;
  }

};

module.exports = categoryService;
