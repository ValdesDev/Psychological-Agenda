// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const projectName = "consulta";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

hbs.registerPartials(__dirname + "/views/partials");

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const signUp = require("./routes/signup.routes");
app.use("/auth", signUp);

const logIn = require("./routes/login.routes");
app.use("/auth",logIn);

const psychologist = require("./routes/psychologist.routes");
app.use("/",psychologist);

const client = require("./routes/client.routes");
app.use("/",client);

const appointment = require("./routes/appointment.routes");
app.use("/",appointment);

const contact = require("./routes/contact.routes");
app.use("/",contact);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
