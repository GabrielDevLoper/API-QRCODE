const qr = require("qr-image");

class QrCodeController {
  async store(req, res) {
    const { urls } = req.body;

    const code = qr.image(urls, { type: "svg" });

    res.type("svg");
    code.pipe(res);
  }
}

module.exports = new QrCodeController();
