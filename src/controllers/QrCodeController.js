const qr = require("qr-image");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const scrape = require("website-scraper");
const prisma = new PrismaClient();

class QrCodeController {
  async store(req, res) {
    const { url } = req.query;

    const code = qr.image(url, { type: "svg" });
    const codePDF = qr.image(url, { type: "pdf" });

    //adicionando o qrd em pd a uma pasta
    codePDF.pipe(
      require("fs").createWriteStream(`src/qrcodes/${url}-${uuidv4()}.pdf`)
    );

    res.type("svg");
    return code.pipe(res);
  }

  async renderQrcode(req, res) {
    const { id } = req.params;

    const user = await prisma.tb_usuarios.findMany({
      where: { id: Number(id) },
      select: {
        cpf: true,
        nome: true,
      },
    });

    res.render("home", {
      name: user[0].nome,
      cpf: user[0].cpf,
    });
  }
}

module.exports = new QrCodeController();
