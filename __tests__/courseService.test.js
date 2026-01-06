jest.mock('../model/Course', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn()
}));

jest.mock('../model/Category', () => ({
  findByPk: jest.fn()
}));

const courseService = require('../service/courseService');
const Course = require('../model/Course');
const Category = require('../model/Category');

describe("Course Service", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllCourses doit retourner les cours publiés avec leur catégorie", async () => {
    const mockCourses = [
      {
        id: 1,
        title: "JavaScript",
        published: true,
        category: { id: 1, name: "Web" }
      }
    ];

    Course.findAll.mockResolvedValue(mockCourses);

    const result = await courseService.getAllCourses();

    expect(Course.findAll).toHaveBeenCalledWith({
      where: { published: true },
      include: {
        model: expect.anything(),
        as: 'category',
        attributes: ['id', 'name']
      }
    });

    expect(result).toEqual(mockCourses);
  });

  test("getCourseById doit retourner un cours par id", async () => {
    const mockCourse = {
      id: 1,
      title: "Node.js",
      category: { id: 2, name: "Backend" }
    };

    Course.findByPk.mockResolvedValue(mockCourse);

    const result = await courseService.getCourseById(1);

    expect(Course.findByPk).toHaveBeenCalledWith(1, {
      include: {
        model: expect.anything(),
        as: 'category',
        attributes: ['id', 'name']
      }
    });

    expect(result).toEqual(mockCourse);
  });

  test("createCourse doit créer un cours si la catégorie existe", async () => {
    const newCourse = {
      title: "React",
      categoryId: 1
    };

    Category.findByPk.mockResolvedValue({ id: 1, name: "Web" });
    Course.create.mockResolvedValue(newCourse);

    const result = await courseService.createCourse(newCourse);

    expect(Category.findByPk).toHaveBeenCalledWith(1);
    expect(Course.create).toHaveBeenCalledWith(newCourse);
    expect(result).toEqual(newCourse);
  });

  test("createCourse doit lever une erreur si la catégorie n'existe pas", async () => {
    const newCourse = {
      title: "Angular",
      categoryId: 999
    };

    Category.findByPk.mockResolvedValue(null);

    await expect(courseService.createCourse(newCourse))
      .rejects
      .toThrow("CategoryId invalide");
  });

  test("updateCourse doit mettre à jour un cours existant", async () => {
    const mockCourse = {
      update: jest.fn()
    };

    Course.findByPk.mockResolvedValue(mockCourse);

    const result = await courseService.updateCourse(1, { title: "Nouveau titre" });

    expect(mockCourse.update).toHaveBeenCalledWith({ title: "Nouveau titre" });
    expect(result).toBe(mockCourse);
  });

  test("updateCourse doit retourner null si le cours n'existe pas", async () => {
    Course.findByPk.mockResolvedValue(null);

    const result = await courseService.updateCourse(999, { title: "Test" });

    expect(result).toBeNull();
  });

  test("deleteCourse doit supprimer un cours existant", async () => {
    const mockCourse = {
      destroy: jest.fn()
    };

    Course.findByPk.mockResolvedValue(mockCourse);

    const result = await courseService.deleteCourse(1);

    expect(mockCourse.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  test("deleteCourse doit retourner null si le cours n'existe pas", async () => {
    Course.findByPk.mockResolvedValue(null);

    const result = await courseService.deleteCourse(999);

    expect(result).toBeNull();
  });

});

