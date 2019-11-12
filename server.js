const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const mongoURI = require("./config/keys").mongoURI;
const itemsRouter = require("./routes/api/items")

const app = express();


const port = process.env.PORT || 5000;

// body-parser middleware
app.use(bodyParser.json())

// connect to mongodb
mongoose
    .connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    // .then(() => console.log(`MongoDB connected`))
    // .catch((err) => console.log(`error connecting to mongoDB`, err))

const db = mongoose.connection;

db.on("error", (err) => {
    console.log(`error connecting to mongo`, err)
})

db.once("open", () => {
    console.log(`successfully established mongodb connection`)
})


// items router
app.use("/api/items", itemsRouter)


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