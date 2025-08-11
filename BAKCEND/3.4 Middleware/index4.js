import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  res.send("<h1>Good news</h1>"+
  "<h2>Your band name was created : </h2>" +req.body.street +" "+req.body.pet);
  console.log(req.body); // Print on console 
});

app.get("/", (req, res) => { 
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
