import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Express Server!</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About me</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact me</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});