const { Router } = require("express");
const QrCodeController = require("./controllers/QrCodeController");
const routes = Router();

routes.get("/home/:id", QrCodeController.renderQrcode);
routes.get("/qrcode", QrCodeController.store);

module.exports = routes;
