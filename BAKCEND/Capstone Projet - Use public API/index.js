import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";
import {dirname} from  'path';
import {fileURLToPath} from 'url';


const app = express();
const PORT = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// GET: Shows up the static form
app.get("/", async (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


// POST: Receives the month and day from the form and makes a request to the public API
app.post("/events", async (req, res) => {
  try {
    const month = req.body.month;
    const day = req.body.day;

    const response = await axios.get(
      `https://byabbe.se/on-this-day/${month}/${day}/events.json`
    );

    const result = response.data.events;
    res.render("events.ejs", { events: result, error: null });

  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("events.ejs", { events: null, error: "No se pudieron obtener los eventos." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});