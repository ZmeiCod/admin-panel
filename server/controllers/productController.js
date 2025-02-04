const { v4: uuid } = require("uuid");
const path = require("path");
const { Product, ProductInfo, Addition } = require("../models/models");
const ApiError = require("../error/ApiError");

class productController {
  async create(req, res, next) {
    try {
      // Получаем данные из запроса
      let { name, price, categoryId, markId, article, info } = req.body;
      const { image } = req.files;

      // Генерируем имя файла для изображения
      let fileName = uuid() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));

      // Создаем товар
      const product = await Product.create({
        name,
        price,
        categoryId,
        markId,
        image: fileName,
        article,
      });

      // Если есть дополнительная информация, сохраняем ее
      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          ProductInfo.create({
            description: i.description,
            productId: product.id,
          })
        );
      }

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { categoryId, markId } = req.query;
    let products;
    const whereConditions = {};

    if (categoryId) {
      whereConditions.categoryId = categoryId;
    }

    if (markId) {
      whereConditions.markId = markId;
    }

    products = await Product.findAndCountAll({
      where: whereConditions,
      include: [{ model: ProductInfo, as: "info" }],
    });

    return res.json(products);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: "info" }],
    });
    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Product.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Ошибка при удалении категории" });
    }
  }
}

module.exports = new productController();
