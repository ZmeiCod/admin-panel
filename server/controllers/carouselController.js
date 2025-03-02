const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
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
      const slide = await Carousel.findOne({ where: { id } });

      if (!slide) {
        return res.status(404).json({ message: "Слайд не найден" });
      }
      const imagePath = path.resolve(__dirname, "..", "static", slide.image);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Ошибка при удалении файла: ", err);
          return res
            .status(500)
            .json({ message: "Ошибка при удалении изображения" });
        }
        console.log("Изображение успешно удалено");
      });

      await Carousel.destroy({ where: { id } });

      return res.status(204).send();
    } catch (error) {
      console.error("Ошибка при удалении слайда", error);
      return res.status(500).json({ message: "Ошибка при удалении слайда" });
    }
  }
}

module.exports = new сarouselController();
