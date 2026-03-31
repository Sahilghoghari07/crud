const express = require("express");
const cors = require("cors");
require("dotenv").config({ quiet: true });

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.use(errorHandler); //global middlewares at last

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
