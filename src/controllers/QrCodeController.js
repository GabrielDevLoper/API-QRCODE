const qr = require("qr-image");

class QrCodeController {
  async store(req, res) {
    const { url } = req.query;

    const code = qr.image(url, { type: "svg" });

    res.type("svg");
    code.pipe(res);
  }

  async renderQrcode(req, res) {
    const { id } = req.params;

    res.render("home", {
      url: "facebook.com",
    });
  }
}

module.exports = new QrCodeController();
