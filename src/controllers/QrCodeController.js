const qr = require("qr-image");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class QrCodeController {
  async store(req, res) {
    const { url } = req.query;

    const code = qr.image(url, { type: "svg" });
    const codePDF = qr.image(url, { type: "pdf" });

    res.type("svg");
    code.pipe(res);
  }

  async renderQrcode(req, res) {
    const { id } = req.params;
    const user = await prisma.users.findMany({
      where: { id: Number(id) },
      select: {
        cpf: true,
        name: true,
      },
    });

    console.log(user[0].name);

    res.render("home", {
      name: user[0].name,
      cpf: user[0].cpf,
    });
  }
}

module.exports = new QrCodeController();
