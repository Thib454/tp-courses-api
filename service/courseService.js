const Course = require('../model/Course');
const Category = require('../model/Category');

const courseService = {

  getAllCourses: async () => {
    return await Course.findAll({
      where: { published: true },
      include: { model: Category, as: 'category', attributes: ['id','name'] }
    });
  },

  getCourseById: async (id) => {
    const course = await Course.findByPk(id, {
      include: { model: Category, as: 'category', attributes: ['id','name'] }
    });
    return course;
  },

  createCourse: async (data) => {
    const category = await Category.findByPk(data.categoryId);
    if (!category) throw new Error('CategoryId invalide');

    const newCourse = await Course.create(data);
    return newCourse;
  },

  updateCourse: async (id, data) => {
    const course = await Course.findByPk(id);
    if (!course) return null;

    if (data.categoryId) {
      const category = await Category.findByPk(data.categoryId);
      if (!category) throw new Error('CategoryId invalide');
    }

    await course.update(data);
    return course;
  },

  deleteCourse: async (id) => {
    const course = await Course.findByPk(id);
    if (!course) return null;

    await course.destroy();
    return true;
  }

};

module.exports = courseService;
