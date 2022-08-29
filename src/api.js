// const express = require("express");
// not working ... why? https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning
const express = __non_webpack_require__('express');

const serverless = require("serverless-http");
// https://github.com/ranm8/requestify
const requestify = require('requestify'); 

const app = express();
const router = express.Router();

const BASE = '/.netlify/functions/api';

// router.get("/", (req, res) => {
//   res.json({
//     hello: "hi!"
//   });
// });

function humanDate(date) {
  const formattingOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  let day = date ? new Date(date) : new Date();

  return day.toLocaleDateString('ro', formattingOptions);
}

function generateRandom(maxLimit = 100){
  let rand = Math.random() * maxLimit;
  console.log(rand); // say 99.81321410836433

  rand = Math.floor(rand); // 99

  return rand;
}

router.get("/", (req, res) => {
  let docs = `<h1>GET endpoints</h1>` +
             `<ul>` +
                `<li><a href="${BASE}/random" target="_blank" />/random</a></li>` +
                `<li><a href="${BASE}/cuvant" target="_blank" />/cuvant</a></li>` +
                `<li><a href="${BASE}/cuvinte" target="_blank" />/cuvinte</a></li>` +
              `</ul>`;
  res.send(docs)
});

router.get("/cuvant", (req, res) => {

  let json = req.query.json === '' || false;
  let random = req.query.random === '' || false;

  let cuvinte, postate = [];
  requestify.get('https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/cuvantulzilei/cuvintePostate').then(function(response) {
      cuvinte = response.getBody();
      postate = cuvinte.cuvintePostate;
      
      if(cuvinte && postate) {
        let wordIndex;
        if(random) {
          wordIndex = generateRandom(postate.length);
        } else {
          wordIndex = postate.findIndex(c => humanDate(c.dateCorrect) === humanDate())
        }
        if(wordIndex > -1) {
          let dateFromApi = humanDate(postate[wordIndex].dateCorrect);
          let cuvantFromApi = postate[wordIndex].cuvant;
          let definitionFromApi = postate[wordIndex].definition;

            if(json) {
              res.json({
                cuvant: cuvantFromApi,
                definition: definitionFromApi,
                date: dateFromApi,
              });
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

  requestify.get('https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/cuvantulzilei/cuvintePostate').then(function(response) {
      cuvinte = response.getBody();
      postate = cuvinte.cuvintePostate;
      
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
