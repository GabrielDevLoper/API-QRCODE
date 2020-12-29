const { Router } = require("express");
const QrCodeController = require("./controllers/QrCodeController");
const routes = Router();

routes.post("/qrcode", QrCodeController.store);

module.exports = routes;
