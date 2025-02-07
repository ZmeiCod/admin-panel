const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Carousel = sequelize.define('carousel', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  image: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  article: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  weight: { type: DataTypes.INTEGER, allowNull: false },
});

const Addition = sequelize.define("addition", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  article: { type: DataTypes.INTEGER, unique: true },
  image: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  weight: { type: DataTypes.INTEGER, allowNull: false },
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

const CategoryMark = sequelize.define("category_mark", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Category.hasMany(Product);
Product.belongsTo(Category);

Mark.hasMany(Product);
Product.belongsTo(Mark);

Addition.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Addition, { foreignKey: "productId" });

Mark.belongsToMany(Category, { through: CategoryMark });
Category.belongsToMany(Mark, { through: CategoryMark });

module.exports = {
  User,
  Product,
  Mark,
  Category,
  CategoryMark,
  Addition,
  Carousel,
};
