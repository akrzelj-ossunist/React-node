const express = require('express')
const app = express();
const cors = require('cors');
const fs = require('fs');

//use cors to allow cross origin resource sharing otherwise its blocked
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let cats;

//With get request we send data to frontend
app.get("/api", (req,res) => {
    let rawdata = fs.readFileSync('cats.json');
    cats = JSON.parse(rawdata); 
    res.json(cats)
})

//With post we get data from frontend
app.post("/cat", function (req, res) {
    let newCat = {
        key: req.body.key,
        name: req.body.name,
        age: req.body.age,
        color: req.body.color
    }
    cats.push(newCat)
    let i = 0;
    cats.map(el => {
        i++;
        el.key = i;
    })
    let jsonContent = JSON.stringify(cats, null, 2);
    fs.writeFile("cats.json", jsonContent, 'utf8', () => {});
})

app.listen(5000, () => { console.log("Server started at port 5000!") })