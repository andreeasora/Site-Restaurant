const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors")
const fs = require("fs");
const bodyParser = require("body-parser");
const uuid = require("uuid");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(cors());

app.listen(port, () => {
    console.log("Aplicatia asculta de portul: ", port);
});

///GET - DETALII CONTACT
app.get("/DetaliiContact", (req, res) => 
{
    res.send(readProiectJson());
});

///POST - DETALII CONTACT
app.post("/DetaliiContact", (req, res) => 
{
    const DetaliiContact = readProiectJson();
    DetaliiContact.push(req.body);
    writeProiectJson(DetaliiContact);
    res.send(req.body);
});

// Functia de citire din fisierul proiect.json -- DETALII CONTACT
function readProiectJson() 
{
    return JSON.parse(fs.readFileSync("proiect.json"))["DetaliiContact"];
}

// Functia de scriere in fisierul proiect.json -- DETALII CONTACT
function writeProiectJson(content)
{
 fs.writeFileSync(
    "proiect.json",
    JSON.stringify({ DetaliiContact: content }),
    "utf8",
    err => {
    if (err) {
        console.log(err);
    }
    }
);
}

///PUT - DETALII CONTACT
app.put("/DetaliiContact",(req,res)=>
{
    var id = req.query.id;
    console.log("Id-ul modificat:"+id);
    var det = readProiectJson();
    for(var i=0; i<det.length;i++){
        if(det[i].id == id)
        {
            req.body.id = id;
            det[i] = req.body;
        }
    }
    writeProiectJson(det);
    res.send(det);
}
)

///DELETE - DETALII CONTACT
app.delete("/DetaliiContact",(req,res)=>
{
    var id = req.query.id;
    var det = readProiectJson();
    var detaliiNoi = [];
    for(var i=0; i<det.length;i++){
        if(det[i].id !== id)
        {
            detaliiNoi.push(det[i]);
        }
    }
    writeProiectJson(detaliiNoi);
    res.send(detaliiNoi);
})

///GET - DETALII COMENZI
app.get("/DetaliiComenzi", (req, res) => 
{
    res.send(readSecondJson());
});

///POST - DETALII COMENZI
app.post("/DetaliiComenzi", (req, res) => 
{
    const DetaliiComenzi = readSecondJson();
    DetaliiComenzi.push(req.body);
    writeSecondJson(DetaliiComenzi);
    res.send(req.body);
});

// Functia de citire din fisierul second.json -- DETALII COMENZI
function readSecondJson() 
{
    return JSON.parse(fs.readFileSync("second.json"))["DetaliiComenzi"];
}

// Functia de scriere in fisierul second.json -- DETALII COMENZI
function writeSecondJson(content) 
{
 fs.writeFileSync(
    "second.json",
    JSON.stringify({ DetaliiComenzi: content }),
    "utf8",
    err => {
    if (err) {
        console.log(err);
    }
    }
);
}

///POST - LOGIN
app.post("/DateLogin", (req, res) => 
{
    const DetaliiLogin = readLoginJson();
    var det = req.body;
    det.id = uuid.v1();
    DetaliiLogin.push(det);
    writeLoginJson(DetaliiLogin);
    res.send(det);
});

///GET - LOGIN
app.get("/DateLogin", (req, res) => 
{
    res.send(readLoginJson());
});

// Functia de citire din fisierul login.json -- DATE LOGIN
function readLoginJson() 
{
    return JSON.parse(fs.readFileSync("login.json"))["DateLogin"];
}

// Functia de scriere in fisierul login.json -- DATE LOGIN
function writeLoginJson(content)
{
 fs.writeFileSync(
    "login.json",
    JSON.stringify({ DateLogin: content }),
    "utf8",
    err => {
    if (err) {
        console.log(err);
    }
    }
);
}

///DELETE - LOGIN
app.delete("/DateLogin",(req,res)=>
{
    var id = req.query.id;
    var det = readLoginJson();
    var detaliiNoi = [];
    for(var i=0; i<det.length;i++){
        if(det[i].id !== id)
        {
            detaliiNoi.push(det[i]);
        }
    }
    writeLoginJson(detaliiNoi);
    res.send(detaliiNoi);
})

///PUT - LOGIN
app.put("/DateLogin",(req,res)=>
{
    var id = req.query.id;
    console.log("Id-ul modificat:"+id);
    var det = readLoginJson();
    for(var i=0; i<det.length;i++){
        if(det[i].id == id)
        {
            req.body.id = id;
            det[i] = req.body;
        }
    }
    writeLoginJson(det);
    res.send(det);
}
)
