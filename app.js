const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const exphbs = require("express-handlebars")
const methodOverride = require("method-override")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const connectDB = require("./config/db")

// Load config
dotenv.config({ path: "./config/config.env" })

// Passport config
require("./config/passport")(passport)

const app = express()

//BODY PARSER
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

//Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

//HELPERS
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
  colorClass,
} = require("./helpers/hbs")

// HandleBars
// add .engine after exphbs
app.engine(
  ".hbs",
  exphbs.engine({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
      colorClass,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
)
app.set("view engine", ".hbs")

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
)

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())
//SET GLOBAL VARIABLE
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// static folder
app.use(express.static(path.join(__dirname, "/public")))

// Routes
app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/stories", require("./routes/stories"))
app.use("/release", require("./routes/release"))
app.use("/zen", require("./routes/zen"))
app.use("/moods", require("./routes/moods"))




const PORT = process.env.PORT || 3000
connectDB().then(() => {
  app.listen(
    PORT,
    console.log(
      `Server is running on ${process.env.NODE_ENV} mode on PORT ${PORT}`
    ),
    //test for Cyclic Deploy
    console.log(`${process.env.MONGO_URI}`)
  )
})
