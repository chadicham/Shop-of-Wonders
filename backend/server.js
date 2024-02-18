const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const cors = require("cors");
const fileUpload = require('express-fileupload');


connectDB();

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/articles", require("./routes/articlesRoutes"));

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
