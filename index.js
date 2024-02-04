const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("<h1>Get requests<h1>");
});

app.post("/login", (req, res) => {
  res.send({ message: "your code works fine" });
});

app.put("/update", (req, res) => {
  res.send({ message: "still basics" });
});
app.delete("/delete", (req, res) => {
  res.send({ message: "everyday problems" });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Ready to go on ${PORT}`);
});
