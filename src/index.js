const express = require("express");
const movies = require("./movies");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to my favourite movie list");
});

app.get("/api/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/api/users", (req, res) => {
  res.status(401).send("unauthorized");
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));

  if (!movie) {
    res.status(400).send("Not Found");
  } else {
    res.status(200).json(movie.title);
  }
});

app.get("/api/search", (req, res) => {
  const maxDuration = movies.filter(
    (movie) => movie.duration <= parseInt(req.query.maxDuration)
  );
  if (maxDuration) {
    res.status(200).json(maxDuration);
  } else {
    res.status(200).send([]);
  }
});

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
