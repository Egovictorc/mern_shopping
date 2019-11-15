const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
// const bodyParser = require("body-parser")
// const mongoURI = require("./config/keys").mongoURI;
const config = require("config")

const app = express();

// DB config
const db = config.get("mongoURI")

const port = process.env.PORT || 5000;

// body-parser middleware
app.use(express.json())

// connect to mongodb
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true,
    useCreateIndex: true })
    // .then(() => console.log(`MongoDB connected`))
    // .catch((err) => console.log(`error connecting to mongoDB`, err))

const dbo = mongoose.connection;

dbo.on("error", (err) => {
    console.log(`error connecting to mongo`, err)
})

dbo.once("open", () => {
    console.log(`successfully established mongodb connection`)
})


// use Routes
app.use("/api/items", require("./routes/api/items"))
app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))


// serve static assets if in production

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}
app.listen(port, () => {
    console.log(`server started on port:::: ${port}`)
})