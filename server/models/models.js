const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// - DataTypes.INTEGER | Числовое значение
// - DataTypes.STRING | Строчное значение
// - primaryKey: true | Первичный ключ
// - autoIncrement: true | Индивидуальное и всегда + 1 к значению при новом объекте
// - unique: true | Уникальное название
// - allowNull: false | Не может быть пустым

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  article: { type: DataTypes.INTEGER, unique: true,  allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  description: {type: DataTypes.STRING, allowNull: false},
  weight: { type: DataTypes.INTEGER, allowNull: false }, // добавил
});

const Addition = sequelize.define("addition", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  article: { type: DataTypes.INTEGER, unique: true }, 
  image: { type: DataTypes.STRING, allowNull: false }, 
  price: { type: DataTypes.INTEGER, allowNull: false }, 
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

const Mark = sequelize.define("mark", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

// Связующее звено между категориями и метками
// Подробнее в конце кода
const CategoryMark = sequelize.define("category_mark", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// В каждой категории может быть множество продуктов
Category.hasMany(Product);
Product.belongsTo(Category);

// У каждой метки может быть множество продуктов
// То есть логика такая, что именно метке присвается продукт, чтобы потом можно было сделать сортировку на сайте (Например по скидкам или новому)
Mark.hasMany(Product);
Product.belongsTo(Mark);

// Добавик присваевается конкретному продукту
Addition.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Addition, { foreignKey: 'productId' });

// Связка категори
Mark.belongsToMany(Category, { through: CategoryMark });
Category.belongsToMany(Mark, { through: CategoryMark });

module.exports = {
  User,
  Product,
  Mark,
  Category,
  CategoryMark,
  Addition,
};
