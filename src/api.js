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

// API SPECS
// /cuvant
// /cuvant?json
// /cuvant?random

// /cuvinte
// /cuvinte?json
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
  res.json({
    cuvant: 'cuvant',
    date: new Date().toLocaleDateString()
  });
});


router.get("/cuvinte", (req, res) => {
  let cuvinte, postate = [];
  requestify.get('https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/cuvantulzilei/cuvintePostate').then(function(response) {
      cuvinte = response.getBody();
      postate = cuvinte.cuvintePostate;
      
      if(cuvinte && postate) {
          res.send(cuvinte.cuvintePostate) 
      }
  });
});

app.use(`${BASE}/`, router);

module.exports = app;
module.exports.handler = serverless(app);
