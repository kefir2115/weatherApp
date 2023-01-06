const express = require('express');
const app = express();

const fs = require('fs');
const http = require('http');
const request = require("request");

const appl = {
    key: "4449ea03decd4000a41134257212910"
};

app.get('/', (req, res) => {
    console.log(req);
    res.send("uwu");
});

app.get('/weather/:id', (req, res) => {
    let id = req.params.id;
    if(id.endsWith(".css")) {
        res.download("css/"+id);
        return;
    }
    request("http://api.weatherapi.com/v1/current.json?key="+appl.key+"&q="+id+"&aqi=no", (err, re, body) => {
        res.send(applyArgs(fs.readFileSync("pages/page.html", "utf8"), [up(id), body]));
    });
});

app.listen(5000);

const applyArgs = (str, args) => {
    let i = 0;
    args.forEach(e => {
        str = str.replace("#s#", e);
        i++;
    });
    return str;
}
function up(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}