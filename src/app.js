import express from "express";
import path from "path";
import cors from "cors"
import routes from "./routes/v1"
import { connectToMongo } from "./utils/dbConnector";

const app = express();

// TODO: Use a whitelist
app.use(cors());
app.options('*', cors());

connectToMongo()

app.use('api/v1', routes);

app.use(express.static(path.join(__dirname, '..', '..', "client", "build")));
app.use("/public", express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
