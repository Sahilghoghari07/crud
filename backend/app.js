const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middlewares/errorHandler");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config({ quiet: true });

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.use(errorHandler); //global middlewares at last

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
