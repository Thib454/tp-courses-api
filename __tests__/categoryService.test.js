jest.mock('../model/Category', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn()
}));

jest.mock('../model/Course', () => ({}));

const categoryService = require('../service/categoryService');
const Category = require('../model/Category');

describe("Category Service", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllCategories doit retourner toutes les catégories avec leurs cours", async () => {
    const mockCategories = [
      {
        id: 1,
        name: "Web",
        courses: [{ id: 1, title: "JavaScript" }]
      },
      {
        id: 2,
        name: "Mobile",
        courses: []
      }
    ];

    Category.findAll.mockResolvedValue(mockCategories);

    const result = await categoryService.getAllCategories();

    expect(Category.findAll).toHaveBeenCalledWith({
      include: { model: expect.anything(), as: 'courses' }
    });

    expect(result).toEqual(mockCategories);
  });

  test("getCategoryById doit retourner une catégorie par id avec ses cours", async () => {
    const mockCategory = {
      id: 1,
      name: "Backend",
      courses: [{ id: 1, title: "Node.js" }]
    };

    Category.findByPk.mockResolvedValue(mockCategory);

    const result = await categoryService.getCategoryById(1);

    expect(Category.findByPk).toHaveBeenCalledWith(1, {
      include: { model: expect.anything(), as: 'courses' }
    });

    expect(result).toEqual(mockCategory);
  });

  test("createCategory doit créer une nouvelle catégorie", async () => {
    const newCategory = {
      name: "DevOps",
      description: "CI/CD et déploiement"
    };

    Category.create.mockResolvedValue(newCategory);

    const result = await categoryService.createCategory(newCategory);

    expect(Category.create).toHaveBeenCalledWith({
      name: "DevOps",
      description: "CI/CD et déploiement"
    });

    expect(result).toEqual(newCategory);
  });

});
