import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import mongoose from "mongoose";
import path from "path"

const __dirname = import.meta.dirname;

// Routers go here
import basketRouter from "./src/routes/basket.js"
import indexRouter from "./src/routes/index.js"
import menuRouter from "./src/routes/menu.js"
import receiptRouter from "./src/routes/receipt.js"

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");
app.set("layout", "layouts/layout");
app.use(expressEjsLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyParser.json());


// Connect to the database
mongoose.connect(process.env.MONGODB_URI, {});
const db = mongoose.connection;
db.on("error", e => console.error(e));
db.on("open", () => console.log("Database connected"));

// Assign the routes
app.use("/", indexRouter);
app.use("/basket", basketRouter);
app.use("/menu", menuRouter);
app.use("/receipt", receiptRouter);


app.listen(process.env.PORT || 3000);
