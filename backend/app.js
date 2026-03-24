const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();
require("dotenv").config({ quiet: true });

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
