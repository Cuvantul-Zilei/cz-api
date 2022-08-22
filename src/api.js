// const express = require("express");
//  not working ... why? https://stackoverflow.com/questions/41692643/webpack-and-express-critical-dependencies-warning

const express = __non_webpack_require__('express');
const serverless = require("serverless-http");
const requestify = require('requestify'); 

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});


router.get("/cuvinte", (req, res) => {
  // let cuvinte = fetch('https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/cuvantulzilei/cuvintePostate').then(res => res.json());
  let cuvinte, postate = [];
  requestify.get('https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/cuvantulzilei/cuvintePostate').then(function(response) {
      cuvinte = response.getBody();
      postate = cuvinte.cuvintePostate;
      
      if(cuvinte && postate) {
          res.send(cuvinte.cuvintePostate) 
      }
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
