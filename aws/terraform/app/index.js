const app = require("express")();

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running at http://localhost:3000");
});
