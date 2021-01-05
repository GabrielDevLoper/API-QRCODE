const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // retornando o caminho
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan("dev"));
app.use(routes);

app.listen(3333, () => {
  console.log("servidor ligado");
});
