const express = require("express");
const router = express.Router();
const shippingController = require("../controllers/shipping.controller");


router.post("/create", shippingController.createShipping);
router.get("/", shippingController.getAllShipping);
router.put("/:id", shippingController.updateShipping);
router.delete("/:id", shippingController.deleteShipping);

module.exports = router;