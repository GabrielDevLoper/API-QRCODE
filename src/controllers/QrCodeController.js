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

    const user = await prisma.tb_usuarios
      .findUnique({
        where: { id: Number(id) },
      })
      .paciente_agendamento();

    console.log(user);

    res.render("home", {
      name: user.nome,
      cpf: user.cpf,
    });
  }
}

module.exports = new QrCodeController();
