import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";

const app = express(),
  port = 4000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(router);

app.all("*", (req, res) => {
  res.status(404).send("URI not found!");
});

app.listen(port);
