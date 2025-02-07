const Router = require("express");
const router = new Router();

const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const markRouter = require("./markRouter");
const additionRouter = require("./additionRouter");
const carouselRouter = require('./carouselRouter');

router.use("/user", userRouter);
router.use("/mark", markRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/addition", additionRouter);
router.use("/carousel", carouselRouter);

module.exports = router;
