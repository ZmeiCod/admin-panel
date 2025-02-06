const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const { Product, ProductInfo, Addition } = require("../models/models");
const ApiError = require("../error/ApiError");

class productController {
  async create(req, res, next) {
    try {
      let { name, price, categoryId, markId, article, description, weight } =
        req.body;
      const { image } = req.files;

      let fileName = uuid() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const product = await Product.create({
        name,
        price,
        categoryId,
        markId,
        image: fileName,
        article,
        description,
        weight,
      });

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
    });

    return res.json(products);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
    });
    return res.json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      price,
      categoryId,
      markId,
      image: fileName,
      article,
      description,
      weight,
    } = req.body;

    try {
      const [updated] = await Category.update(
        {
          name,
          price,
          categoryId,
          markId,
          image: fileName,
          article,
          description,
          weight,
        },
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).json({ message: "Продукт не найден" });
      }

      const updatedCategory = await Category.findOne({ where: { id } });
      return res.json(updatedCategory);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findOne({ where: { id } });
      const deletedCount = await Product.destroy({ where: { id } });
      const imagePath = path.resolve(__dirname, "..", "static", product.image);

      if (!product) {
        return res.status(404).json({ message: "Продукт не найден" });
      }

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Ошибка при удалении файла: ", err);
          return res
            .status(500)
            .json({ message: "Ошибка при удалении изображения" });
        }

        console.log("Изображение успешно удалено");
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Продукт не найден" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при удалении продукта" });
    }
  }
}

module.exports = new productController();
