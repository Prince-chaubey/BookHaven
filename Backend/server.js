require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const cors=require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
mongoose.connect(process.env.DB_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Error:", err));


app.use('/user',userRouter);

app.get("/profile", (req, res) => {
    res.send("hi");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});