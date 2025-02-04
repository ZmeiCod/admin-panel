const uuid = require('uuid')
const path = require('path');
const { Addition } = require("../models/models");
const ApiError = require("../error/ApiError");

// Файл не доделан, он на будещее, поскольку для пицц будут добавки 

class additionController {
  async create(req, res) {
    const { article, image, price, productId } = req.body;
    const { img } = req.files;

    let fileName = uuid() + ".jpg";
    img.mv(path.resolve(__dirname, '..', 'static', fileName));

    try {
      const addition = await Addition.create({ article, img: fileName, price, productId });
      return res.status(201).json(addition);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const additions = await Addition.findAll();
      return res.json(additions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { article, image, price, productId } = req.body;

    try {
      const [updated] = await Addition.update({ article, image, price, productId }, { where: { id } });

      if (!updated) {
        return res.status(404).json({ message: "Добавка не найдена" });
      }

      const updatedAddition = await Addition.findOne({ where: { id } });
      return res.json(updatedAddition);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Addition.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ message: "Добавка не найдена" });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Ошибка при удалении добавки" });
    }
  }
}

module.exports = new additionController();
