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
  role: { type: DataTypes.STRING, defaultValue: "USER" }, // Строка, по умолчанию все пользователи
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketProduct = sequelize.define("basket_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  article: { type: DataTypes.INTEGER, unique: true,  allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },

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

const ProductInfo = sequelize.define("product_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
});

// Связующее звено между категориями и метками
// Подробнее в конце кода
const CategoryMark = sequelize.define("category_mark", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// У каждого юзера есть корзина и у каждой корзины есть свой юзер
User.hasOne(Basket);
Basket.belongsTo(User);

// В корзине может быть множество продуктов
Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

// В каждой категории может быть множество продуктов
Category.hasMany(Product);
Product.belongsTo(Category);

// У каждой метки может быть множество продуктов
// То есть логика такая, что именно метке присвается продукт, чтобы потом можно было сделать сортировку на сайте (Например по скидкам или новому)
Mark.hasMany(Product);
Product.belongsTo(Mark);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

// Каждый продукт имеет описание
Product.hasMany(ProductInfo, { as: "info" });
ProductInfo.belongsTo(Product);

// Добавик присваевается конкретному продукту
Addition.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Addition, { foreignKey: 'productId' });

// Связка категори
Mark.belongsToMany(Category, { through: CategoryMark });
Category.belongsToMany(Mark, { through: CategoryMark });

module.exports = {
  User,
  Basket,
  BasketProduct,
  Product,
  Mark,
  Category,
  CategoryMark,
  ProductInfo,
  Addition,
};
