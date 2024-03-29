// const express = require("express");
// not working ... why? https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning
const express = __non_webpack_require__('express');

const serverless = require("serverless-http");
// https://github.com/ranm8/requestify
const requestify = require('requestify'); 
const INTERNAL_API_URL = "https://script.google.com/macros/s/AKfycbyk69E5TaJRlam2OD4VBF5WBNc6oP8GSdbzTr_42KUdruPpmx_1e5XvsE1cnxEEnPsR/exec?path=cuvinte"

// import { humanDate, generateRandom } from './helpers'

const app = express();
const router = express.Router();

const BASE = '/.netlify/functions/api';

function humanDate(date) {
  const formattingOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  let day = date ? new Date(date) : new Date();

  return day.toLocaleDateString('ro', formattingOptions);
}

function generateRandom(maxLimit = 100){
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand); // 99

  return rand;
}

router.get("/", (req, res) => {
  let docs = `<h1>GET endpoints</h1>` +
             `<ul>` +
                `<li><a href="${BASE}/cuvant" target="_blank" />/cuvant</a></li>` +
                `<li><a href="${BASE}/cuvant?json" target="_blank" />/cuvant?json</a></li>` +
                `<li><a href="${BASE}/cuvant?random" target="_blank" />/cuvant?random</a></li>` +
                `<li><a href="${BASE}/cuvant?mesaj" target="_blank" />/cuvant?mesaj</a></li>` +
                `<li></li>`
                `<li><a href="${BASE}/cuvinte" target="_blank" />/cuvinte</a></li>` +
                `<li><a href="${BASE}/cuvinte?json" target="_blank" />/cuvinte?json</a></li>` +
              `</ul>`;
  res.send(docs)
});

router.get("/cuvant", (req, res) => {

  let json = req.query.json === '' || false;
  let random = req.query.random === '' || false;
  let mesaj = req.query.mesaj === '' || false;

  let cuvinte, postate = [];
  requestify.get(INTERNAL_API_URL).then(function(response) {
      postate = response.getBody();
      
      if(cuvinte && postate) {
        let wordIndex;
        if(random) {
          wordIndex = generateRandom(postate.length);
        } else {
          wordIndex = postate.findIndex(c => humanDate(c.dateIso) === humanDate())
        }
        if(wordIndex > -1) {
          let dateFromApi = humanDate(postate[wordIndex].dateIso);
          let cuvantFromApi = postate[wordIndex].cuvant;
          let definitionFromApi = postate[wordIndex].definition;

            if(json) {
              if(mesaj) {
                // todo: reaseach manychat API response format
                // res.json({
              } else {
                res.json({
                  cuvant: cuvantFromApi,
                  definition: definitionFromApi,
                  date: dateFromApi,
                });
              }
            } else {
              res.send(cuvantFromApi)
            }
        } else {
          res.json({
            notFound: true
          })
        }
        
      }
  });

  
});


router.get("/cuvinte", (req, res) => {
  let json = req.query.json === '' || false;
  let cuvinte, postate = [];

  requestify.get(INTERNAL_API_URL).then(function(response) {
      postate = response.getBody();

      
      if(cuvinte && postate) {
          if(json) {
            res.json(postate) 
          } else {
            let cuvinteCSV = postate.map(c => c.cuvant).join(', ');
            res.send(cuvinteCSV)
          }
      }
  });
});

app.use(`${BASE}/`, router);

module.exports = app;
module.exports.handler = serverless(app);
