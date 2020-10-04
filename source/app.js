// init code
const path = require("path");
const express= require('express');
const hbs= require("hbs");
const app=express();
require("dotenv").config();
const port=process.env.PORT||3000;
// Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath= path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

const getID = require('./utils/weather')

// Setup handlerbars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/',(req,res)=>{
   res.render('index',{
       title: "Weather App",
       name: "Manish Kumar"
   });
    
});
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
              error: "You must provide the address.",
        })
    }
    getID(req.query.address, (error, id) => {
        if(error) {
            res.send({
                error:error,
            })
        }
        const API_KEY = process.env.WEATHER_API_KEY;
        res.send({
            id:id, 
            API_KEY : API_KEY,
        })
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name: "Manish Kumar",
        title: "About",
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        message: "This Website is under development Phase. Page Not Found.",
        title: "Help",
        name:"Manish Kumar", 

    })
});
app.get("/help/*", (req, res) => {
    res.render("help", {
      title: "404",
      message: "Help article not found.",
      name: "Manish Kumar",
    });
  });
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: "Manish Kumar",
        message: "Page not found."
    })
})

app.listen(port,()=>{
    console.log("Server is running on port "+ port);
});