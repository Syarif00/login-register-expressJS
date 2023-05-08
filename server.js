const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");

require("dotenv").config();
const db = require("./config/database/database");
const sequelize = require("./config/database/database");
const eventRoutes = require("./routes/eventRoute");
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");

const app = express();
const port = process.env.APP_PORT;

app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
    },
  })
);


app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);



db.authenticate()
  .then(() => {
    console.log("Database connected...");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

sequelize.sync();
