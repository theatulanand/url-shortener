const express = require('express');
const app = express();
const cors = require('cors');
const shortUrl = require("node-url-shortener");

function logger(req, res, next) {
  console.log(new Date(), req.method, req.url);
  next();
}

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
})

app.post('/shorturl', (req, res) => {
  const { url } = req.body;
  shortUrl.short(url, function(err, shortedUrl) {
    if (err) {
      res.status(400).send("Something went wrong");
    } else {
      res.status(200).send(shortedUrl)
    }
  });
})

app.listen(3002, () => {
  console.log("Server Started at 3002")
})
