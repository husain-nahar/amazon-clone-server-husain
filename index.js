// PORT ADDRESS
const PORT = process.env.PORT || 3000;

// URL ADDRESS TO MONGO-DB
const DB = "mongodb+srv://husainahar90:52MyWay53@cluster0.7oncq6o.mongodb.net/?retryWrites=true&w=majority";

// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// IMPORTS FROM OTHER FILES
const authRouter = require("./routes/auth");

// INIT
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(authRouter);
app.use(cors());

// CONNECTIONS
// - to mongoose
mongoose.connect(DB).then(() => {
    console.log("Succesfully connected to mongodb database");

}).catch(e => {
    console.log(`ERROR connecting to mongodb database: ${e}`);
});

// - to local server
app.listen(PORT, "0.0.0.0", () => {
    // console.log("connected to the port" + PORT);
    console.log(`connected to the port ${PORT}`);
    });

// API's
// app.get("/hello-world", (req, res) => {
//     res.json({
//         "apiKey": "Kakwkdmmerigfigjgjvnfmftkkejwjqabbdn",
//         "name": "Husain Nahar",
//         "products": [
//             {
//             "id": 1,
//             "name": "potato",
//             "stock": 6,
//             "price": 12,
//             "offer_price": 10, 
//         },
//         {
//             "id": 2,
//             "name": "tomato",
//             "stock": 4,
//             "price": 7,
//             "offer_price": 5, 
//         }
//     ]
//     });
// });