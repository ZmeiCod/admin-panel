const { v4: uuid } = require("uuid");
const path = require("path");
const { Carousel } = require("../models/models");
const ApiError = require("../error/ApiError");

class сarouselController {
  async create(req, res, next) {
    try {
      let { name } = req.body;
      const { image } = req.files;

      let fileName = uuid() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));

      const сarousel = await Carousel.create({
        name,
        image: fileName,
      });

      return res.json(сarousel);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const carousels = await Carousel.findAll();
    return res.json(carousels);
  }

 async delete(req, res) {
    const { id } = req.params;
    try {
      await Carousel.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Ошибка при удалении категории" });
    }
  }
}

module.exports = new сarouselController();
