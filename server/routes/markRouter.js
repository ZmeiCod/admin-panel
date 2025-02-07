const Router = require("express");
const router = new Router();
const markController = require("../controllers/markController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), markController.create);
router.get("/", markController.getAll);
router.put("/:id", markController.update);
router.delete("/:id", markController.delete);

module.exports = router;
