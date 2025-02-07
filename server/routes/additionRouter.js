const Router = require("express");
const router = new Router();
const additionController = require("../controllers/additionController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), additionController.create);
router.get("/", additionController.getAll);
router.put("/:id", additionController.update);
router.delete("/:id", additionController.delete);

module.exports = router;
