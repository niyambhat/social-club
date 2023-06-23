const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const options = {
  origin: "http://localhost:3000",
  useSuccessStatus: 200,
};

// Define routes

const app = express();
app.use(cors(options));
app.use(express.json());
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//db
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("db conected"))
  .catch((err) => console.log("error connecting to db"));

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
