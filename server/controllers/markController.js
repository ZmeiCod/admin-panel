const { Mark } = require("../models/models");
const ApiError = require("../error/ApiError");

class markController {
  async create(req, res) {
    const { name } = req.body;
    const mark = await Mark.create({ name });
    return res.json(mark);
  }

  async getAll(req, res) {
    const marks = await Mark.findAll();
    return res.json(marks);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const [updated] = await Mark.update({ name }, { where: { id } });

      if (!updated) {
        return res.status(404).json({ message: "Категория не найдена" });
      }

      const updatedMark = await Mark.findOne({ where: { id } });
      return res.json(updatedMark);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Mark.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Ошибка при удалении категории" });
    }
  }
}

module.exports = new markController();
