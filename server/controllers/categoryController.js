const { v4: uuid } = require("uuid");
const path = require("path");
const { Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class categoryController {
  async create(req, res, next) {
    try {
      let { name } = req.body;
      const { image } = req.files;

      let fileName = uuid() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const category = await Category.create({
        name,
        image: fileName,
      });

      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, image } = req.body;

    try {
      const [updated] = await Category.update(
        { name, image },
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).json({ message: "Категория не найдена" });
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
      await Category.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Ошибка при удалении категории" });
    }
  }
}

module.exports = new categoryController();
