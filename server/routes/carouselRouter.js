const Router = require("express");
const router = new Router();
const carouselController = require("../controllers/carouselController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), carouselController.create);
router.get("/", carouselController.getAll);
router.delete("/:id", checkRole("ADMIN"), carouselController.delete);

module.exports = router;
