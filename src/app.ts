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

app.all("*", (req, res) =>
  res.status(404).json({
    code: 404,
    message: "URI Not Found!",
  })
);

app.use(function (err: any, req: any, res: any, next: any) {
  console.log(err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port);
