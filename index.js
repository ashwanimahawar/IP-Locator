//Importing important modules
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config();

//PORT and Express APP Initialization
const port = 3000;
const app = express();

//Tell express that the static file are in PUBLIC folder.
app.use(express.static("public"));

//Body Parser
app.use(bodyParser.urlencoded({extended : true}));

//Render the index.ejs for the Home route
app.get("/", (req, res) => {
    res.render("index.ejs", { 
        content: "Enter your IP Address and click search button to know the information.",
        ipaddress: false
    });
});

//Render the index.ejs after taking the information about the IP entered by user.
app.post("/search", async (req, res) => {
    const IP = req.body.ip;
    try{
        const result = await axios.get(process.env.API_URL + IP + "/json/");
        res.render("index.ejs", { 
            content : "The information related to entered IP Address is mentioned below:",
            ipaddress: true,
            city: JSON.stringify(result.data.city),
            ip: JSON.stringify(result.data.ip),
            version: JSON.stringify(result.data.version),
            region: JSON.stringify(result.data.region),
            region_code: JSON.stringify(result.data.region_code),
            country_name: JSON.stringify(result.data.country_name),
            country_code: JSON.stringify(result.data.country_code),
            country_capital: JSON.stringify(result.data.country_capital),
            postal: JSON.stringify(result.data.postal),
            longitude: JSON.stringify(result.data.longitude),
            latitude: JSON.stringify(result.data.latitude),
            currency: JSON.stringify(result.data.currency),
            
        });
    } catch (error){
        console.log("Hello");
        res.render("index.ejs", { content : JSON.stringify(error.response.data)});
    }
});

//Intialize server listening on the port
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});